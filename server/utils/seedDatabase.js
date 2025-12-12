// server/utils/seedDatabase.js
const mongoose = require('mongoose');
const colors = require('colors');
const User = require('../models/User');
const Event = require('../models/Event');
const Venue = require('../models/Venue');
const Booking = require('../models/Booking');
const Registration = require('../models/Registration');
const connectDB = require('../config/db');
require('dotenv').config();

// Demo user credentials
const demoUsers = [
  {
    name: 'Demo Student',
    email: 'student@demo.com',
    password: 'demo123',
    role: 'student',
  },
  {
    name: 'Demo Club Admin',
    email: 'club@demo.com',
    password: 'demo123',
    role: 'club_admin',
  },
  {
    name: 'Tech Club Admin',
    email: 'techclub@demo.com',
    password: 'demo123',
    role: 'club_admin',
  },
  {
    name: 'Cultural Club Admin',
    email: 'cultural@demo.com',
    password: 'demo123',
    role: 'club_admin',
  },
  {
    name: 'Demo Super Admin',
    email: 'admin@demo.com',
    password: 'demo123',
    role: 'super_admin',
  },
];

// Demo venues
const demoVenues = [
  {
    name: 'Main Auditorium',
    location: 'Building A, Ground Floor',
    capacity: 500,
  },
  {
    name: 'Seminar Hall 1',
    location: 'Building B, 2nd Floor',
    capacity: 100,
  },
  {
    name: 'Conference Room',
    location: 'Admin Block, 3rd Floor',
    capacity: 50,
  },
  {
    name: 'Open Air Theatre',
    location: 'Campus Ground',
    capacity: 1000,
  },
  {
    name: 'Lab Complex',
    location: 'Building C, 1st Floor',
    capacity: 60,
  },
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🗑️  Clearing existing data...'.yellow.bold);
    
    // Delete all existing data
    await User.deleteMany();
    await Event.deleteMany();
    await Venue.deleteMany();
    await Booking.deleteMany();
    await Registration.deleteMany();

    console.log('✅ Data cleared successfully'.green);

    // Create demo users
    console.log('👥 Creating demo users...'.yellow.bold);
    const users = await User.create(demoUsers);
    console.log(`✅ Created ${users.length} demo users`.green);

    // Get specific users for reference
    const studentUser = users.find(u => u.role === 'student');
    const clubAdmin = users.find(u => u.email === 'club@demo.com');
    const techClubAdmin = users.find(u => u.email === 'techclub@demo.com');
    const culturalClubAdmin = users.find(u => u.email === 'cultural@demo.com');

    // Create venues
    console.log('🏢 Creating venues...'.yellow.bold);
    const venues = await Venue.create(demoVenues);
    console.log(`✅ Created ${venues.length} venues`.green);

    // Create demo events (future events)
    console.log('🎉 Creating demo events...'.yellow.bold);
    const today = new Date();
    
    const demoEvents = [
      {
        name: 'AI & Machine Learning Workshop',
        description: 'Learn the fundamentals of AI and ML with hands-on projects. Industry experts will guide you through real-world applications.',
        organizer: techClubAdmin._id,
        clubName: 'Tech Club',
        category: 'Workshop',
      },
      {
        name: 'Annual Cultural Fest 2025',
        description: 'Join us for a spectacular celebration of culture, music, and dance. Featuring performances from talented students and special guests.',
        organizer: culturalClubAdmin._id,
        clubName: 'Cultural Society',
        category: 'Cultural',
      },
      {
        name: 'Coding Competition - CodeFest',
        description: 'Test your programming skills in this exciting coding competition. Amazing prizes for winners!',
        organizer: techClubAdmin._id,
        clubName: 'Tech Club',
        category: 'Competition',
      },
      {
        name: 'Entrepreneurship Seminar',
        description: 'Learn from successful entrepreneurs about starting and scaling your own business. Q&A session included.',
        organizer: clubAdmin._id,
        clubName: 'Business Club',
        category: 'Seminar',
      },
      {
        name: 'Web Development Bootcamp',
        description: 'Intensive 3-day bootcamp covering HTML, CSS, JavaScript, React, and Node.js. Build real projects!',
        organizer: techClubAdmin._id,
        clubName: 'Tech Club',
        category: 'Workshop',
      },
      {
        name: 'Music Night - Battle of Bands',
        description: 'Annual inter-college battle of bands. Show your talent and win exciting prizes!',
        organizer: culturalClubAdmin._id,
        clubName: 'Cultural Society',
        category: 'Cultural',
      },
      {
        name: 'Data Science Seminar',
        description: 'Industry experts discuss the latest trends in data science and career opportunities.',
        organizer: techClubAdmin._id,
        clubName: 'Tech Club',
        category: 'Seminar',
      },
      {
        name: 'Hackathon 2025',
        description: '24-hour hackathon to build innovative solutions. Form teams and win prizes worth $5000!',
        organizer: techClubAdmin._id,
        clubName: 'Tech Club',
        category: 'Competition',
      },
    ];

    const events = await Event.create(demoEvents);
    console.log(`✅ Created ${events.length} demo events`.green);

    // Create demo bookings with future dates
    console.log('📅 Creating demo bookings...'.yellow.bold);
    const demoBookings = [
      {
        event: events[0]._id,
        venue: venues[1]._id, // Seminar Hall 1
        user: techClubAdmin._id,
        startTime: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        endTime: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // +3 hours
        status: 'approved',
      },
      {
        event: events[1]._id,
        venue: venues[3]._id, // Open Air Theatre
        user: culturalClubAdmin._id,
        startTime: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        endTime: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000), // +5 hours
        status: 'approved',
      },
      {
        event: events[2]._id,
        venue: venues[4]._id, // Lab Complex
        user: techClubAdmin._id,
        startTime: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        endTime: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), // +4 hours
        status: 'approved',
      },
      {
        event: events[3]._id,
        venue: venues[0]._id, // Main Auditorium
        user: clubAdmin._id,
        startTime: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        endTime: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // +2 hours
        status: 'approved',
      },
      {
        event: events[4]._id,
        venue: venues[4]._id, // Lab Complex
        user: techClubAdmin._id,
        startTime: new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
        endTime: new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000), // +8 hours (3 days)
        status: 'pending',
      },
      {
        event: events[5]._id,
        venue: venues[3]._id, // Open Air Theatre
        user: culturalClubAdmin._id,
        startTime: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        endTime: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), // +4 hours
        status: 'approved',
      },
    ];

    const bookings = await Booking.create(demoBookings);
    console.log(`✅ Created ${bookings.length} demo bookings`.green);

    // Create demo registrations
    console.log('📝 Creating demo registrations...'.yellow.bold);
    const demoRegistrations = [
      {
        booking: bookings[0]._id,
        event: events[0]._id,
        user: studentUser._id,
      },
      {
        booking: bookings[1]._id,
        event: events[1]._id,
        user: studentUser._id,
      },
      {
        booking: bookings[3]._id,
        event: events[3]._id,
        user: studentUser._id,
      },
    ];

    const registrations = await Registration.create(demoRegistrations);
    console.log(`✅ Created ${registrations.length} demo registrations`.green);

    console.log('\n🎊 Database seeded successfully!'.green.bold);
    console.log('\n📋 Demo Credentials:'.cyan.bold);
    console.log('━'.repeat(50).cyan);
    console.log('👨‍🎓 Student Account:'.yellow);
    console.log('   Email: student@demo.com');
    console.log('   Password: demo123\n');
    console.log('👔 Club Admin Account:'.yellow);
    console.log('   Email: club@demo.com');
    console.log('   Password: demo123\n');
    console.log('🔧 Tech Club Admin:'.yellow);
    console.log('   Email: techclub@demo.com');
    console.log('   Password: demo123\n');
    console.log('🎭 Cultural Club Admin:'.yellow);
    console.log('   Email: cultural@demo.com');
    console.log('   Password: demo123\n');
    console.log('👑 Super Admin Account:'.yellow);
    console.log('   Email: admin@demo.com');
    console.log('   Password: demo123\n');
    console.log('━'.repeat(50).cyan);

    process.exit(0);
  } catch (error) {
    console.error(`❌ Error seeding database: ${error.message}`.red.bold);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
