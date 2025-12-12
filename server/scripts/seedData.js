// Seed Data Script for Evento Project
// This script populates the database with 2 events per month from Dec 2025 to May 2026

const mongoose = require('mongoose');
const Event = require('../models/Event');
const Venue = require('../models/Venue');
const Booking = require('../models/Booking');
const User = require('../models/User');
require('dotenv').config();

const categories = ['Workshop', 'Competition', 'Seminar', 'Cultural', 'Other'];
const clubs = ['E-Cell', 'Tech Club', 'Cultural Society', 'Sports Committee', 'Drama Club', 'Music Society', 'Dance Club', 'Photography Club'];

const eventTemplates = [
    { name: 'Tech Workshop', description: 'Hands-on workshop on latest technologies', category: 'Workshop' },
    { name: 'Coding Competition', description: 'Test your programming skills', category: 'Competition' },
    { name: 'Guest Lecture', description: 'Industry expert sharing insights', category: 'Seminar' },
    { name: 'Cultural Fest', description: 'Celebrating diversity and culture', category: 'Cultural' },
    { name: 'Hackathon', description: '24-hour coding marathon', category: 'Competition' },
    { name: 'Art Exhibition', description: 'Showcase of student artwork', category: 'Cultural' },
    { name: 'Career Seminar', description: 'Planning your professional journey', category: 'Seminar' },
    { name: 'Music Concert', description: 'Live music performance', category: 'Cultural' },
    { name: 'Dance Workshop', description: 'Learn different dance forms', category: 'Workshop' },
    { name: 'Photography Walk', description: 'Capture campus beauty', category: 'Other' },
    { name: 'Startup Pitch', description: 'Present your business ideas', category: 'Competition' },
    { name: 'Film Screening', description: 'Classic cinema appreciation', category: 'Cultural' },
];

// Function to generate random time between 9 AM and 6 PM
function getRandomTime() {
    const hours = Math.floor(Math.random() * 9) + 9; // 9 AM to 5 PM
    const minutes = Math.random() > 0.5 ? 0 : 30;
    return { hours, minutes };
}

// Function to generate events for a specific month
function generateEventsForMonth(year, month, clubAdminId, venues) {
    const events = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Generate 2 events per month at random dates
    const usedDates = new Set();
    
    for (let i = 0; i < 2; i++) {
        let day;
        do {
            day = Math.floor(Math.random() * daysInMonth) + 1;
        } while (usedDates.has(day));
        usedDates.add(day);
        
        const template = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
        const club = clubs[Math.floor(Math.random() * clubs.length)];
        const venue = venues[Math.floor(Math.random() * venues.length)];
        
        const startTime = getRandomTime();
        const startDate = new Date(year, month, day, startTime.hours, startTime.minutes);
        const endDate = new Date(startDate);
        endDate.setHours(startDate.getHours() + 2); // 2 hour duration
        
        const monthName = startDate.toLocaleString('en-US', { month: 'long' });
        
        events.push({
            event: {
                name: `${template.name} - ${monthName} ${year}`,
                description: template.description,
                clubName: club,
                category: template.category,
                organizer: clubAdminId, // Changed from createdBy to organizer
            },
            booking: {
                event: null, // Will be set after event creation
                venue: venue._id,
                user: clubAdminId, // User who made the booking request (club admin)
                startTime: startDate,
                endTime: endDate,
                status: 'approved', // All events are pre-approved
            }
        });
    }
    
    return events;
}

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Get or create club admin user
        let clubAdmin = await User.findOne({ email: 'club@demo.com' });
        if (!clubAdmin) {
            console.log('❌ Club admin not found. Please register club@demo.com first!');
            process.exit(1);
        }
        console.log('✅ Found club admin:', clubAdmin.name);

        // Get all venues
        const venues = await Venue.find();
        if (venues.length === 0) {
            console.log('❌ No venues found. Please create venues first!');
            process.exit(1);
        }
        console.log(`✅ Found ${venues.length} venues`);

        // Generate events from December 2025 to May 2026
        const months = [
            { year: 2025, month: 11 }, // December 2025 (month is 0-indexed)
            { year: 2026, month: 0 },  // January 2026
            { year: 2026, month: 1 },  // February 2026
            { year: 2026, month: 2 },  // March 2026
            { year: 2026, month: 3 },  // April 2026
            { year: 2026, month: 4 },  // May 2026
        ];

        let totalCreated = 0;

        for (const { year, month } of months) {
            const monthName = new Date(year, month).toLocaleString('en-US', { month: 'long' });
            console.log(`\n📅 Creating events for ${monthName} ${year}...`);
            
            const eventsData = generateEventsForMonth(year, month, clubAdmin._id, venues);
            
            for (const data of eventsData) {
                // Create event
                const event = await Event.create(data.event);
                
                // Create booking
                data.booking.event = event._id;
                const booking = await Booking.create(data.booking);
                
                console.log(`   ✅ Created: ${event.name} at ${data.booking.startTime.toLocaleString()}`);
                totalCreated++;
            }
        }

        console.log(`\n🎉 Successfully created ${totalCreated} events with bookings!`);
        console.log('📊 Distribution: 2 events per month from Dec 2025 to May 2026');
        
    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\n✅ Disconnected from MongoDB');
    }
}

// Run the seed function
seedDatabase();
