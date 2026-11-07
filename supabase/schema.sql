
-- Portfolio content. Visitors can read. Writes go through the server admin.
drop table if exists public.profile cascade;
drop table if exists public.site_copy cascade;
drop table if exists public.socials cascade;
drop table if exists public.tools cascade;
drop table if exists public.stats cascade;
drop table if exists public.services cascade;
drop table if exists public.projects cascade;
drop table if exists public.process_steps cascade;
drop table if exists public.plans cascade;
drop table if exists public.extra_services cascade;
drop table if exists public.principles cascade;
drop table if exists public.faqs cascade;
drop table if exists public.values cascade;
drop table if exists public.experience cascade;
drop table if exists public.highlights cascade;
drop table if exists public.credentials cascade;
drop table if exists public.legal_pages cascade;
drop table if exists public.links cascade;

create table public.profile (
  id int primary key,
  name text not null default '',
  wordmark text not null default '',
  role text not null default '',
  location text not null default '',
  phone text not null default '',
  phone_href text not null default '',
  email text not null default '',
  resume text not null default '',
  portrait text not null default '',
  availability text not null default '',
  eyebrow text not null default '',
  tagline text not null default '',
  hours text[] not null default '{}',
  intro text not null default '',
  about text not null default '',
  constraint profile_singleton check (id = 1)
);

create table public.site_copy (
  id int primary key,
  data jsonb not null default '{}'::jsonb,
  constraint site_copy_singleton check (id = 1)
);

create table public.socials (
  id bigint generated always as identity primary key,
  label text not null default '',
  name text not null default '',
  href text not null default '',
  sort int not null default 0
);

create table public.tools (
  id bigint generated always as identity primary key,
  label text not null default '',
  sort int not null default 0
);

create table public.stats (
  id bigint generated always as identity primary key,
  value text not null default '',
  label text not null default '',
  sort int not null default 0
);

create table public.services (
  id bigint generated always as identity primary key,
  number text not null default '',
  title text not null default '',
  image text not null default '',
  description text not null default '',
  tags text[] not null default '{}',
  sort int not null default 0
);

create table public.projects (
  id bigint generated always as identity primary key,
  slug text not null unique,
  title text not null default '',
  client text not null default '',
  category text not null default '',
  year text not null default '',
  services text not null default '',
  image text not null default '',
  summary text not null default '',
  live_url text not null default '',
  overview text not null default '',
  overview_note text not null default '',
  challenge text not null default '',
  solution text not null default '',
  impact_intro text not null default '',
  impact_lines text[] not null default '{}',
  gallery text[] not null default '{}',
  sort int not null default 0
);

create table public.process_steps (
  id bigint generated always as identity primary key,
  number text not null default '',
  title text not null default '',
  image text not null default '',
  body text not null default '',
  sort int not null default 0
);

create table public.plans (
  id bigint generated always as identity primary key,
  name text not null default '',
  blurb text not null default '',
  project_price int not null default 0,
  retainer_price int not null default 0,
  popular boolean not null default false,
  features text[] not null default '{}',
  sort int not null default 0
);

create table public.extra_services (
  id bigint generated always as identity primary key,
  label text not null default '',
  sort int not null default 0
);

create table public.principles (
  id bigint generated always as identity primary key,
  quote text not null default '',
  name text not null default '',
  role text not null default '',
  image text not null default '',
  sort int not null default 0
);

create table public.faqs (
  id bigint generated always as identity primary key,
  question text not null default '',
  answer text not null default '',
  sort int not null default 0
);

create table public.values (
  id bigint generated always as identity primary key,
  title text not null default '',
  body text not null default '',
  image text not null default '',
  sort int not null default 0
);

create table public.experience (
  id bigint generated always as identity primary key,
  company text not null default '',
  role text not null default '',
  when_label text not null default '',
  place text not null default '',
  body text not null default '',
  sort int not null default 0
);

create table public.highlights (
  id bigint generated always as identity primary key,
  kicker text not null default '',
  title text not null default '',
  body text not null default '',
  sort int not null default 0
);

create table public.credentials (
  id bigint generated always as identity primary key,
  year text not null default '',
  title text not null default '',
  detail text not null default '',
  org text not null default '',
  sort int not null default 0
);

create table public.legal_pages (
  id bigint generated always as identity primary key,
  slug text not null unique,
  title text not null default '',
  updated_label text not null default '',
  lede text not null default '',
  sections jsonb not null default '[]'::jsonb,
  sort int not null default 0
);

create table public.links (
  id bigint generated always as identity primary key,
  group_name text not null default 'primary',
  label text not null default '',
  href text not null default '',
  sort int not null default 0
);


alter table public.profile enable row level security;
drop policy if exists "public read" on public.profile;
create policy "public read" on public.profile
  for select to anon, authenticated
  using (true);
grant select on public.profile to anon, authenticated;
grant all on public.profile to service_role;

alter table public.site_copy enable row level security;
drop policy if exists "public read" on public.site_copy;
create policy "public read" on public.site_copy
  for select to anon, authenticated
  using (true);
grant select on public.site_copy to anon, authenticated;
grant all on public.site_copy to service_role;

alter table public.socials enable row level security;
drop policy if exists "public read" on public.socials;
create policy "public read" on public.socials
  for select to anon, authenticated
  using (true);
grant select on public.socials to anon, authenticated;
grant all on public.socials to service_role;

alter table public.tools enable row level security;
drop policy if exists "public read" on public.tools;
create policy "public read" on public.tools
  for select to anon, authenticated
  using (true);
grant select on public.tools to anon, authenticated;
grant all on public.tools to service_role;

alter table public.stats enable row level security;
drop policy if exists "public read" on public.stats;
create policy "public read" on public.stats
  for select to anon, authenticated
  using (true);
grant select on public.stats to anon, authenticated;
grant all on public.stats to service_role;

alter table public.services enable row level security;
drop policy if exists "public read" on public.services;
create policy "public read" on public.services
  for select to anon, authenticated
  using (true);
grant select on public.services to anon, authenticated;
grant all on public.services to service_role;

alter table public.projects enable row level security;
drop policy if exists "public read" on public.projects;
create policy "public read" on public.projects
  for select to anon, authenticated
  using (true);
grant select on public.projects to anon, authenticated;
grant all on public.projects to service_role;

alter table public.process_steps enable row level security;
drop policy if exists "public read" on public.process_steps;
create policy "public read" on public.process_steps
  for select to anon, authenticated
  using (true);
grant select on public.process_steps to anon, authenticated;
grant all on public.process_steps to service_role;

alter table public.plans enable row level security;
drop policy if exists "public read" on public.plans;
create policy "public read" on public.plans
  for select to anon, authenticated
  using (true);
grant select on public.plans to anon, authenticated;
grant all on public.plans to service_role;

alter table public.extra_services enable row level security;
drop policy if exists "public read" on public.extra_services;
create policy "public read" on public.extra_services
  for select to anon, authenticated
  using (true);
grant select on public.extra_services to anon, authenticated;
grant all on public.extra_services to service_role;

alter table public.principles enable row level security;
drop policy if exists "public read" on public.principles;
create policy "public read" on public.principles
  for select to anon, authenticated
  using (true);
grant select on public.principles to anon, authenticated;
grant all on public.principles to service_role;

alter table public.faqs enable row level security;
drop policy if exists "public read" on public.faqs;
create policy "public read" on public.faqs
  for select to anon, authenticated
  using (true);
grant select on public.faqs to anon, authenticated;
grant all on public.faqs to service_role;

alter table public.values enable row level security;
drop policy if exists "public read" on public.values;
create policy "public read" on public.values
  for select to anon, authenticated
  using (true);
grant select on public.values to anon, authenticated;
grant all on public.values to service_role;

alter table public.experience enable row level security;
drop policy if exists "public read" on public.experience;
create policy "public read" on public.experience
  for select to anon, authenticated
  using (true);
grant select on public.experience to anon, authenticated;
grant all on public.experience to service_role;

alter table public.highlights enable row level security;
drop policy if exists "public read" on public.highlights;
create policy "public read" on public.highlights
  for select to anon, authenticated
  using (true);
grant select on public.highlights to anon, authenticated;
grant all on public.highlights to service_role;

alter table public.credentials enable row level security;
drop policy if exists "public read" on public.credentials;
create policy "public read" on public.credentials
  for select to anon, authenticated
  using (true);
grant select on public.credentials to anon, authenticated;
grant all on public.credentials to service_role;

alter table public.legal_pages enable row level security;
drop policy if exists "public read" on public.legal_pages;
create policy "public read" on public.legal_pages
  for select to anon, authenticated
  using (true);
grant select on public.legal_pages to anon, authenticated;
grant all on public.legal_pages to service_role;

alter table public.links enable row level security;
drop policy if exists "public read" on public.links;
create policy "public read" on public.links
  for select to anon, authenticated
  using (true);
grant select on public.links to anon, authenticated;
grant all on public.links to service_role;

grant usage, select on all sequences in schema public to service_role;

insert into public.profile (id, name, wordmark, role, location, phone, phone_href, email, resume, portrait, availability, eyebrow, tagline, hours, intro, about) values (
  1, 'Arslan Sabir', 'ARSLAN', 'UI/UX & Product Designer', 'Lahore, Punjab, Pakistan', '+92 323 6586188', 'tel:+923236586188', 'marslansabir3322@gmail.com', '/Arslan-Sabir.pdf', '/arslan.jpg', 'Available for work', 'Available globally', 'Designing products that people remember.', array['Monday – Saturday', '10:00 AM – 7:00 PM PKT']::text[], 'UI/UX and product designer with 3 years of experience turning ideas into clear digital products. I design SaaS, fintech, eCommerce, websites, web apps, and mobile apps — from user flows and wireframes to responsive interfaces and interactive Figma prototypes.', 'I focus on products that are useful for people, visually consistent, and aligned with the goal of the business. My work includes shaping flows, building reusable components, and preparing files a developer can build from without guesswork.'
);
insert into public.site_copy (id, data) values (1, '{"navCta":"Book a call","introStatement":"From the first conversation to the final handoff, every project focuses on clear flows, usable interfaces, and products that leave a lasting impression.","servicesTitle":"Creative solutions built around clarity and use","servicesPageLead":"Creative solutions built ","servicesPageRest":"around clarity and use","projectsTitle":"Featured projects that reflect strategy, style and detail","projectsPageTitle":"Selected work across product, web, and mobile","projectsPageText":"Case studies from SaaS, fintech, eCommerce, websites, and apps. Each frame is interface design: flows, layout, and a screen someone can use.","processTitleLead":"The process","processTitleRest":"behind every project","pricingTitle":"Flexible plans for every product","pricingIntro":"Foundation covers a focused flow. Studio covers a fuller product. Retainers keep a designer with the team after launch.","pricingExtraTitle":"Beyond the two plans","pricingNote":"Starting points in USD. Final price follows the scope we agree on.","faqTitle":"Frequently asked questions","contactTitle":"Ready to bring your next idea to life?","contactPageTitle":"Let''s build your next digital product","contactPageText":"Tell me what you are making. I reply with questions, a likely shape for the work, and whether the timing fits.","aboutLead":"Designing products,","aboutRest":"interfaces & digital experiences","aboutName":"Muhammad Arslan Sabir","aboutImage":"/work/05.jpg","experienceTitle":"Experience","studyTitle":"Study & tools","valuesLead":"How the work ","valuesRest":"stays clear","principlesTitle":"Work shaped for products that need to feel clear","principlesNote":"14 selected studies","newsletterTitle":"Join the\nnewsletter"}'::jsonb);
insert into public.socials (label, name, href, sort) values ('BE', 'Behance', 'https://www.behance.net/marslansabir', 0);
insert into public.socials (label, name, href, sort) values ('IN', 'LinkedIn', 'https://www.linkedin.com/in/marslansabir/', 1);
insert into public.socials (label, name, href, sort) values ('DR', 'Dribbble', 'https://dribbble.com/marslansabir', 2);
insert into public.tools (label, sort) values ('Figma', 0);
insert into public.tools (label, sort) values ('UI/UX', 1);
insert into public.tools (label, sort) values ('Product Design', 2);
insert into public.tools (label, sort) values ('Mobile Apps', 3);
insert into public.tools (label, sort) values ('SaaS', 4);
insert into public.tools (label, sort) values ('Fintech', 5);
insert into public.tools (label, sort) values ('Web Design', 6);
insert into public.tools (label, sort) values ('Ecommerce', 7);
insert into public.tools (label, sort) values ('Adobe XD', 8);
insert into public.tools (label, sort) values ('Photoshop', 9);
insert into public.tools (label, sort) values ('Prototyping', 10);
insert into public.tools (label, sort) values ('HTML & CSS', 11);
insert into public.stats (value, label, sort) values ('14+', 'Selected case studies', 0);
insert into public.stats (value, label, sort) values ('3', 'Years designing', 1);
insert into public.stats (value, label, sort) values ('4', 'Product teams', 2);
insert into public.stats (value, label, sort) values ('6', 'Core focus areas', 3);
insert into public.services (number, title, image, description, tags, sort) values ('01.', 'UI/UX Design', '/work/02.jpg', 'Interfaces with a clear hierarchy, comfortable spacing, and interactions that match how people actually move through a task.', array['User flows', 'Interface design', 'Usability', 'Visual systems']::text[], 0);
insert into public.services (number, title, image, description, tags, sort) values ('02.', 'Product Design', '/work/04.jpg', 'Product screens shaped from requirements: structure first, then a visual system a team can extend.', array['Product thinking', 'Feature flows', 'Components', 'Handoff']::text[], 1);
insert into public.services (number, title, image, description, tags, sort) values ('03.', 'Web & Landing Pages', '/work/03.jpg', 'Marketing sites and landing pages that explain the offer quickly and give the next step an obvious place to live.', array['Landing pages', 'Responsive layout', 'Websites', 'Content structure']::text[], 2);
insert into public.services (number, title, image, description, tags, sort) values ('04.', 'Mobile App Design', '/work/09.jpg', 'Phone interfaces for fintech, delivery, tasks, and everyday tools — designed for one-hand use and short sessions.', array['iOS & Android', 'App flows', 'Prototypes', 'UI kits']::text[], 3);
insert into public.services (number, title, image, description, tags, sort) values ('05.', 'SaaS & Dashboards', '/work/14.jpg', 'Dense information made readable. Dashboards, settings, and multi-step tools with patterns a team can reuse.', array['Dashboards', 'Data layout', 'SaaS UI', 'Design patterns']::text[], 4);
insert into public.services (number, title, image, description, tags, sort) values ('06.', 'Prototype & Handoff', '/work/07.jpg', 'Clickable Figma prototypes, organized components, and notes so development can match the design.', array['Figma prototype', 'Specs', 'Components', 'Developer handoff']::text[], 5);
insert into public.projects (slug, title, client, category, year, services, image, summary, sort) values ('working-trust', 'Working Trust', 'Product design', 'Freelance platform', '2026', 'UI/UX Design · Product flows', '/work/01.jpg', 'A freelance workspace for profile, proposals, jobs, and earnings — designed so the next action stays obvious.', 0);
insert into public.projects (slug, title, client, category, year, services, image, summary, sort) values ('todo-task-app', 'TODO Task App', 'Case study', 'Mobile app', '2026', 'UI/UX Design · Mobile interface', '/work/02.jpg', 'A task app organized around capturing work quickly and seeing the day at a glance.', 1);
insert into public.projects (slug, title, client, category, year, services, image, summary, sort) values ('moko-mattress', 'MoKo Mattress', 'Case study', 'Landing page', '2025', 'Landing page · UI/UX Design', '/work/03.jpg', 'A product landing page that leads with the offer, the proof, and a clear way to buy.', 2);
insert into public.projects (slug, title, client, category, year, services, image, summary, sort) values ('nexpay', 'NexPay', 'Case study', 'Fintech app', '2025', 'Fintech UI · Mobile product design', '/work/04.jpg', 'A finance app focused on balances, transfers, and trust at the moment of payment.', 3);
insert into public.projects (slug, title, client, category, year, services, image, summary, sort) values ('frenco', 'Frenco', 'Frenco.ae', 'Agency website', '2025', 'Website UI/UX Design', '/work/05.jpg', 'An eCommerce agency site for services, proof, and a clear way to start a project.', 4);
insert into public.projects (slug, title, client, category, year, services, image, summary, sort) values ('portfolio-landing', 'Portfolio Landing', 'Case study', 'Portfolio website', '2025', 'Portfolio UI · Web design', '/work/06.jpg', 'A personal landing page that introduces the work before the biography.', 5);
insert into public.projects (slug, title, client, category, year, services, image, summary, sort) values ('saas-landing', 'SaaS Landing Page', 'Case study', 'SaaS website', '2025', 'SaaS UI · Landing page', '/work/07.jpg', 'A product homepage that explains the tool, the audience, and the first action.', 6);
insert into public.projects (slug, title, client, category, year, services, image, summary, sort) values ('fine-dining', 'Fine Dining', 'Case study', 'Restaurant website', '2025', 'Web design · UI/UX', '/work/08.jpg', 'A restaurant site paced like a menu: atmosphere first, then hours, dishes, and a reservation.', 7);
insert into public.projects (slug, title, client, category, year, services, image, summary, sort) values ('food-delivery-app', 'Food Delivery App', 'Case study', 'Mobile app', '2024', 'Mobile UI/UX Design', '/work/09.jpg', 'Browse, customize, and track an order in a flow that stays short on a phone.', 8);
insert into public.projects (slug, title, client, category, year, services, image, summary, sort) values ('supplement-hydration', 'Supplement & Hydration', 'Case study', 'E-commerce', '2024', 'E-commerce UI/UX', '/work/10.jpg', 'A storefront for supplements with product proof, variants, and a straightforward cart.', 9);
insert into public.projects (slug, title, client, category, year, services, image, summary, sort) values ('food-delivery-web', 'Food Delivery Website', 'Case study', 'Web design', '2024', 'Web design · UI/UX', '/work/11.jpg', 'A delivery website that keeps restaurants, dishes, and checkout in one readable path.', 10);
insert into public.projects (slug, title, client, category, year, services, image, summary, sort) values ('drone-website', 'Drone Website', 'Case study', 'Web design', '2024', 'Web design · UI/UX', '/work/12.jpg', 'A product site for drones, built around specs, use cases, and a strong first impression.', 11);
insert into public.projects (slug, title, client, category, year, services, image, summary, sort) values ('travel-booking', 'Travel Booking', 'Case study', 'Web design', '2024', 'Web design · UI/UX', '/work/13.jpg', 'Search, compare, and book travel with filters that stay visible while the results change.', 12);
insert into public.projects (slug, title, client, category, year, services, image, summary, sort) values ('vaultex', 'Vaultex', 'Case study', 'Finance dashboard', '2025', 'Dashboard · Fintech UI', '/work/14.jpg', 'A finance dashboard where balance, cash flow, and spending stay readable at a glance.', 13);
insert into public.process_steps (number, title, image, body, sort) values ('01.', 'Discover', '/process/01.jpg', 'Goals, audience, content, and constraints — so the design starts from the product, not a moodboard.', 0);
insert into public.process_steps (number, title, image, body, sort) values ('02.', 'Structure', '/process/02.jpg', 'Flows, wireframes, and the order of screens. This is where the product becomes understandable.', 1);
insert into public.process_steps (number, title, image, body, sort) values ('03.', 'Design', '/process/03.jpg', 'High-fidelity UI in Figma: type, color, components, and states that feel like one product.', 2);
insert into public.process_steps (number, title, image, body, sort) values ('04.', 'Handoff', '/process/04.jpg', 'A clickable prototype, named components, and notes for the people who will build it.', 3);
insert into public.plans (name, blurb, project_price, retainer_price, popular, features, sort) values ('Foundation', 'A focused design engagement for a landing page, a key flow, or a small product.', 1200, 960, false, array['One core user flow', 'Up to 8 high-fidelity screens', 'Wireframes before visual design', 'Clickable Figma prototype', 'Basic component styles', '2 rounds of revisions', '10 days of follow-up questions']::text[], 0);
insert into public.plans (name, blurb, project_price, retainer_price, popular, features, sort) values ('Studio', 'End-to-end product design for a startup, a feature set, or a growing app.', 2800, 2240, true, array['End-to-end product UI', 'Up to 25 high-fidelity screens', 'Flows, wireframes, and UI', 'Starter design system', 'Interactive prototype', 'Developer-ready handoff', 'Revisions during the design window', '30 days of handoff support']::text[], 1);
insert into public.extra_services (label, sort) values ('User flows', 0);
insert into public.extra_services (label, sort) values ('Wireframes', 1);
insert into public.extra_services (label, sort) values ('High-fidelity UI', 2);
insert into public.extra_services (label, sort) values ('Design systems', 3);
insert into public.extra_services (label, sort) values ('Figma prototypes', 4);
insert into public.extra_services (label, sort) values ('Mobile app design', 5);
insert into public.extra_services (label, sort) values ('SaaS product UI', 6);
insert into public.extra_services (label, sort) values ('Dashboard design', 7);
insert into public.extra_services (label, sort) values ('Landing pages', 8);
insert into public.extra_services (label, sort) values ('E-commerce UI', 9);
insert into public.extra_services (label, sort) values ('Fintech interfaces', 10);
insert into public.extra_services (label, sort) values ('Responsive websites', 11);
insert into public.extra_services (label, sort) values ('UX audits', 12);
insert into public.extra_services (label, sort) values ('Component libraries', 13);
insert into public.extra_services (label, sort) values ('Developer handoff', 14);
insert into public.extra_services (label, sort) values ('Pitch deck screens', 15);
insert into public.extra_services (label, sort) values ('Icon & visual sets', 16);
insert into public.extra_services (label, sort) values ('Design QA', 17);
insert into public.principles (quote, name, role, image, sort) values ('A marketplace only works when posting work, comparing people, and hiring feel obvious on the first pass.', 'Working Trust', 'Web application · UI/UX', '/work/01.jpg', 0);
insert into public.principles (quote, name, role, image, sort) values ('Fintech screens should make the balance, the action, and the consequence visible before anyone taps confirm.', 'NexPay', 'Fintech app · Product design', '/work/04.jpg', 1);
insert into public.principles (quote, name, role, image, sort) values ('A dashboard is successful when someone can answer ‘what needs me?’ without reading every number.', 'Vaultex', 'SaaS · Interface design', '/work/14.jpg', 2);
insert into public.principles (quote, name, role, image, sort) values ('Mobile flows should finish the job in a few taps. If a step needs an explanation, the step is still too heavy.', 'Food Delivery App', 'Mobile app · UI/UX', '/work/09.jpg', 3);
insert into public.faqs (question, answer, sort) values ('What kinds of products do you design?', 'SaaS platforms, fintech and eCommerce interfaces, marketing sites, web apps, and mobile apps. Recent work includes a freelancing marketplace, a finance app, dashboards, and landing pages.', 0);
insert into public.faqs (question, answer, sort) values ('What do you need to start?', 'A short brief is enough: who the product is for, what success looks like, and any screens or references you already have. Content can arrive while the structure is taking shape.', 1);
insert into public.faqs (question, answer, sort) values ('How does a project usually run?', 'Discover the goal, structure the flow, design the interface in Figma, then hand off a prototype and components. You review at each step instead of waiting for a surprise at the end.', 2);
insert into public.faqs (question, answer, sort) values ('Which tools do you use?', 'Figma is the main tool for flows, UI, components, and prototypes. I also use Adobe XD, Photoshop, and Canva, and I understand HTML and CSS well enough to collaborate with developers.', 3);
insert into public.faqs (question, answer, sort) values ('Can you work with an existing product team?', 'Yes. At DevArion I design alongside a team for Transporta, Working Trust, and SkillVexa. I am used to feedback, shared files, and handing work to engineering.', 4);
insert into public.faqs (question, answer, sort) values ('Do you work with clients outside Pakistan?', 'Yes. I am based in Lahore and available for remote work worldwide. Calls can be scheduled around PKT and overlapping US or EU hours.', 5);
insert into public.values (title, body, image, sort) values ('Clarity first', 'Every project starts by making the task obvious. Decoration comes after the flow can stand on its own.', '/process/01.jpg', 0);
insert into public.values (title, body, image, sort) values ('Honest collaboration', 'I share work early, take feedback directly, and keep files organized so a team can move without a meeting for every spacing decision.', '/process/02.jpg', 1);
insert into public.values (title, body, image, sort) values ('Care in the details', 'States, type, and components matter. A product feels finished when the small screens match the hero screens.', '/process/03.jpg', 2);
insert into public.values (title, body, image, sort) values ('Steady improvement', 'Three years in, the work is still about learning the product in front of me — SaaS, fintech, commerce, or a mobile tool.', '/process/04.jpg', 3);
insert into public.experience (company, role, when_label, place, body, sort) values ('DevArion Solution', 'UI/UX & Product Designer', 'Aug 2026 – Present', 'On-site · Lahore', 'Product design for the Transporta mobile app, Working Trust, and the SkillVexa website. I turn requirements into flows, wireframes, responsive UI, and Figma prototypes, then prepare files for developer handoff.', 0);
insert into public.experience (company, role, when_label, place, body, sort) values ('MilestoneZero', 'UI/UX Designer', 'May 2026 – Jul 2026', 'Remote', 'Designed SaaS platforms, dashboards, and web applications. Focused on layout, user flows, components, and brand guidelines with a cross-functional team.', 1);
insert into public.experience (company, role, when_label, place, body, sort) values ('Frenco.ae', 'UI/UX Designer', 'Feb 2024 – Apr 2026', 'On-site', 'Designed eCommerce websites, mobile applications, and responsive interfaces across industries. Worked with developers on implementation that stayed close to the Figma file.', 2);
insert into public.experience (company, role, when_label, place, body, sort) values ('Frenco.ae', 'UI/UX Design Intern', 'Aug 2023 – Feb 2024', 'On-site', 'Supported live client work: wireframes, UI components, prototypes, and the beginnings of a design system. This is where Figma became a daily practice.', 3);
insert into public.highlights (kicker, title, body, sort) values ('Now', 'DevArion Solution', 'Product design for Transporta, Working Trust, and SkillVexa.', 0);
insert into public.highlights (kicker, title, body, sort) values ('Range', 'SaaS to storefronts', 'Fintech, dashboards, eCommerce, websites, and mobile apps.', 1);
insert into public.highlights (kicker, title, body, sort) values ('Craft', 'Figma, end to end', 'Flows, components, prototypes, and a file engineering can use.', 2);
insert into public.credentials (year, title, detail, org, sort) values ('2024 – Now', 'BBIT', 'Business & Information Technology', 'STEP', 0);
insert into public.credentials (year, title, detail, org, sort) values ('Certificate', 'UI/UX Design', 'ID JCX31196', 'KFP, Government of Punjab', 1);
insert into public.credentials (year, title, detail, org, sort) values ('Daily', 'Figma', 'Flows, UI, prototypes', 'Primary tool', 2);
insert into public.credentials (year, title, detail, org, sort) values ('Also', 'Adobe XD', 'Photoshop · Canva', 'Supporting tools', 3);
insert into public.legal_pages (slug, title, updated_label, lede, sections, sort) values ('privacy', 'Privacy Policy', 'November 2026', 'This policy explains how Arslan Sabir handles information shared through this portfolio and by email.', '[{"heading":"Who this covers","text":"This site is the portfolio of Muhammad Arslan Sabir, a UI/UX and product designer in Lahore, Pakistan. Contact: marslansabir3322@gmail.com."},{"heading":"Information you send","text":"If you email me or use the contact form, I receive the details you choose to include: your name, email address, and whatever you write about the project. I use that information to reply and, if we work together, to do the work."},{"heading":"What this site stores","text":"The site is a static portfolio. It does not ask you to create an account. A basic host or analytics tool may record technical data such as browser type and pages visited. You can control cookies in your browser."},{"heading":"How long it stays","text":"Project emails stay in my inbox for as long as the conversation or the work is relevant. You can ask me to delete a message thread that is no longer needed."},{"heading":"Sharing","text":"I do not sell personal information. I only share project details with a collaborator when the work requires it, such as a developer building a screen we have discussed."},{"heading":"Your questions","text":"To ask what I hold, or to request a correction or deletion, email marslansabir3322@gmail.com. I may update this page when the site or the law changes. The date above is the latest version."}]'::jsonb, 0);
insert into public.legal_pages (slug, title, updated_label, lede, sections, sort) values ('terms', 'Terms & Conditions', 'November 2026', 'These terms cover the use of this portfolio and the way design projects with Arslan Sabir are scoped.', '[{"heading":"Using this website","text":"You may browse the work and get in touch about a project. Case studies are shown as design samples. Please do not copy the files, layouts, or writing and present them as your own."},{"heading":"Design services","text":"I design user flows, wireframes, interfaces, and Figma prototypes for digital products. The scope, timeline, and price are agreed in writing before the work starts. Starting prices on the pricing page are guides, not a fixed quote."},{"heading":"Your part of the work","text":"Projects move when feedback, content, and approvals arrive on time. A long pause on your side can move the delivery date."},{"heading":"Payment","text":"A project usually starts with a deposit, then a final payment at handoff. Work outside the agreed scope is estimated separately before I design it."},{"heading":"Revisions","text":"Each engagement includes the revision rounds named in the proposal. A new direction after approval is new work."},{"heading":"Files and credit","text":"After the final payment, you receive the agreed Figma files and the right to use the design for the product we discussed. I may show the work in this portfolio unless we agree otherwise in writing."},{"heading":"Ending a project","text":"Either of us can stop a project if we say so clearly. You pay for the work completed up to that point, and I hand over the files that payment covers."}]'::jsonb, 1);
insert into public.links (group_name, label, href, sort) values ('primary', 'Home', '/', 0);
insert into public.links (group_name, label, href, sort) values ('primary', 'About', '/about', 1);
insert into public.links (group_name, label, href, sort) values ('primary', 'Projects', '/projects', 2);
insert into public.links (group_name, label, href, sort) values ('primary', 'Services', '/services', 3);
insert into public.links (group_name, label, href, sort) values ('footer', 'Home', '/', 0);
insert into public.links (group_name, label, href, sort) values ('footer', 'About', '/about', 1);
insert into public.links (group_name, label, href, sort) values ('footer', 'Services', '/services', 2);
insert into public.links (group_name, label, href, sort) values ('footer', 'Projects', '/projects', 3);
insert into public.links (group_name, label, href, sort) values ('footer', 'Pricing', '/pricing', 4);
insert into public.links (group_name, label, href, sort) values ('resource', 'Contact', '/contact', 0);
insert into public.links (group_name, label, href, sort) values ('resource', 'Privacy Policy', '/privacy-policy', 1);
insert into public.links (group_name, label, href, sort) values ('resource', 'Terms & Conditions', '/terms-conditions', 2);

alter table public.projects add column if not exists live_url text not null default '';
alter table public.projects add column if not exists overview text not null default '';
alter table public.projects add column if not exists overview_note text not null default '';
alter table public.projects add column if not exists challenge text not null default '';
alter table public.projects add column if not exists solution text not null default '';
alter table public.projects add column if not exists impact_intro text not null default '';
alter table public.projects add column if not exists impact_lines text[] not null default '{}';
alter table public.projects add column if not exists gallery text[] not null default '{}';
