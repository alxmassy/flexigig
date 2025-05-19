-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade,
  full_name text,
  phone text,
  location text,
  bio text,
  skills text[],
  business_name text,
  business_type text,
  business_description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Create jobs table
create table jobs (
  id uuid default uuid_generate_v4() primary key,
  business_id uuid references profiles(id) on delete cascade,
  title text not null,
  description text,
  location text not null,
  pay_rate numeric not null,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  requirements text[],
  status text default 'open' check (status in ('open', 'booked', 'completed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create bookings table
create table bookings (
  id uuid default uuid_generate_v4() primary key,
  job_id uuid references jobs(id) on delete cascade,
  student_id uuid references profiles(id) on delete cascade,
  status text default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create ratings table
create table ratings (
  id uuid default uuid_generate_v4() primary key,
  booking_id uuid references bookings(id) on delete cascade,
  rater_id uuid references profiles(id) on delete cascade,
  rated_id uuid references profiles(id) on delete cascade,
  rating integer check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create updated_at trigger function
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger handle_profiles_updated_at
  before update on profiles
  for each row
  execute procedure handle_updated_at();

create trigger handle_jobs_updated_at
  before update on jobs
  for each row
  execute procedure handle_updated_at();

create trigger handle_bookings_updated_at
  before update on bookings
  for each row
  execute procedure handle_updated_at();

-- Set up Row Level Security (RLS)

-- Enable RLS on all tables
alter table profiles enable row level security;
alter table jobs enable row level security;
alter table bookings enable row level security;
alter table ratings enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using (true);

create policy "Users can insert their own profile"
  on profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

-- Jobs policies
create policy "Jobs are viewable by everyone"
  on jobs for select
  using (true);

create policy "Businesses can insert their own jobs"
  on jobs for insert
  with check (
    auth.uid() = business_id
    and exists (
      select 1 from profiles
      where id = auth.uid()
      and business_name is not null
    )
  );

create policy "Businesses can update their own jobs"
  on jobs for update
  using (
    auth.uid() = business_id
    and exists (
      select 1 from profiles
      where id = auth.uid()
      and business_name is not null
    )
  );

-- Bookings policies
create policy "Users can view their own bookings"
  on bookings for select
  using (
    auth.uid() = student_id
    or exists (
      select 1 from jobs
      where jobs.id = bookings.job_id
      and jobs.business_id = auth.uid()
    )
  );

create policy "Students can create bookings"
  on bookings for insert
  with check (
    auth.uid() = student_id
    and exists (
      select 1 from profiles
      where id = auth.uid()
      and business_name is null
    )
  );

create policy "Businesses can update bookings for their jobs"
  on bookings for update
  using (
    exists (
      select 1 from jobs
      where jobs.id = bookings.job_id
      and jobs.business_id = auth.uid()
    )
  );

-- Ratings policies
create policy "Ratings are viewable by everyone"
  on ratings for select
  using (true);

create policy "Users can create ratings for completed bookings"
  on ratings for insert
  with check (
    auth.uid() = rater_id
    and exists (
      select 1 from bookings
      where bookings.id = ratings.booking_id
      and bookings.status = 'completed'
      and (
        bookings.student_id = auth.uid()
        or exists (
          select 1 from jobs
          where jobs.id = bookings.job_id
          and jobs.business_id = auth.uid()
        )
      )
    )
  ); 