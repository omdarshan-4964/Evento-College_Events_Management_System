# 📊 Database Seeding Guide

## How to Populate Events Data (Dec 2025 - May 2026)

Follow these steps to populate your database with 2 events per month:

### 📋 Prerequisites

1. **MongoDB must be running**
2. **Server must have been run at least once** (to create collections)
3. **Demo accounts must be registered**:
   - Club Admin: `club@demo.com` / `demo123`
   - At least one venue must exist in the database

---

### 🚀 Step 1: Create Venues (If Not Already Created)

Login as **Super Admin** (`admin@demo.com` / `demo123`):

1. Go to **Venues** page
2. Create at least 2-3 venues, for example:
   - **Auditorium** (Capacity: 500)
   - **Seminar Hall** (Capacity: 100)
   - **Sports Complex** (Capacity: 200)

---

### 🌱 Step 2: Run the Seed Script

Open a **NEW terminal** in the server directory:

```bash
# Navigate to server folder
cd server

# Run the seed script
node scripts/seedData.js
```

---

### ✅ Expected Output

```
✅ Connected to MongoDB
✅ Found club admin: Demo Club Admin
✅ Found 3 venues

📅 Creating events for December 2025...
   ✅ Created: Tech Workshop - December 2025 at 12/15/2025, 10:00:00 AM
   ✅ Created: Cultural Fest - December 2025 at 12/22/2025, 2:30:00 PM

📅 Creating events for January 2026...
   ✅ Created: Coding Competition - January 2026 at 1/8/2026, 11:00:00 AM
   ✅ Created: Guest Lecture - January 2026 at 1/20/2026, 3:00:00 PM

... (continues for each month)

🎉 Successfully created 12 events with bookings!
📊 Distribution: 2 events per month from Dec 2025 to May 2026

✅ Disconnected from MongoDB
```

---

### 📅 What Gets Created?

The script creates:
- **12 total events** (2 per month × 6 months)
- Random event types: Workshops, Competitions, Seminars, Cultural events
- Random clubs: E-Cell, Tech Club, Cultural Society, etc.
- Random venues from your database
- Random dates within each month
- Random times between 9 AM - 6 PM
- All bookings are **pre-approved** (status: 'approved')

---

### 🗂️ How Archiving Works

Bookings are automatically shown in the **"Archived Bookings"** section when:

1. **❌ Rejected** - Admin rejects the booking request
2. **🚫 Cancelled** - Admin or club admin cancels the booking
3. **📅 Event Passed** - The event date has already occurred (past events)

---

### 🔄 Re-running the Script

If you want to create more events or reset:

```bash
# To clear all events and bookings (optional)
# Run this in MongoDB Compass or mongo shell:
db.events.deleteMany({})
db.bookings.deleteMany({})

# Then run the seed script again
node scripts/seedData.js
```

---

### 🎯 Viewing the Data

After seeding:

1. **Student Dashboard** - Will see upcoming approved events with registration
2. **Club Dashboard** - Will see all events created by club admins
3. **Admin Dashboard** - Will see all bookings (approved/pending/archived)
4. **Calendar** - Will show all approved bookings visually
5. **Analytics** - Will show venue utilization statistics

---

### 🐛 Troubleshooting

**Error: "Club admin not found"**
- Register the demo account: `club@demo.com` / `demo123`

**Error: "No venues found"**
- Login as super admin and create venues first

**Error: "Connection refused"**
- Make sure MongoDB is running
- Check your `.env` file has correct `MONGO_URI`

---

### 🎨 Customization

To modify the seed data, edit `/server/scripts/seedData.js`:

- **Line 8-9**: Change event categories and club names
- **Line 11-22**: Modify event templates
- **Line 25-29**: Adjust time ranges
- **Line 75**: Change number of events per month
- **Line 151-156**: Add more months if needed

---

### 📱 Next Steps

After seeding, you can:
1. View events in different dashboards
2. Register students for events
3. Test the calendar view
4. Check analytics and venue utilization
5. Archive old events by rejecting or cancelling them

**Enjoy exploring your populated Evento database! 🎉**
