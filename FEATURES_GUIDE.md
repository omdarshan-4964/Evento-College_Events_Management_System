# 🎯 Evento - Role-Based Features Guide

This guide shows what each user role can do in the Evento system.

## 📊 Features Comparison Table

| Feature | Student | Club Admin | Super Admin |
|---------|---------|------------|-------------|
| **Authentication & Profile** |
| Register & Login | ✅ | ✅ | ✅ |
| View Own Profile | ✅ | ✅ | ✅ |
| **Events** |
| View All Events | ✅ | ✅ | ✅ |
| Register for Events | ✅ | ❌ | ❌ |
| View My Registrations | ✅ | ❌ | ❌ |
| Create Events | ❌ | ✅ | ❌ |
| Edit Own Events | ❌ | ✅ | ❌ |
| Delete Own Events | ❌ | ✅ | ❌ |
| View All Events Calendar | ✅ | ✅ | ✅ |
| **Venue & Booking** |
| View Available Venues | ❌ | ✅ | ✅ |
| Request Venue Booking | ❌ | ✅ | ❌ |
| View Own Bookings | ❌ | ✅ | ❌ |
| Approve/Reject Bookings | ❌ | ❌ | ✅ |
| Add/Edit/Delete Venues | ❌ | ❌ | ✅ |
| **User Management** |
| View All Users | ❌ | ❌ | ✅ |
| Change User Roles | ❌ | ❌ | ✅ |
| Delete Users | ❌ | ❌ | ✅ |
| **Analytics** |
| View System Analytics | ❌ | ❌ | ✅ |
| View Event Statistics | ❌ | ✅ (Own) | ✅ (All) |
| View Venue Utilization | ❌ | ❌ | ✅ |

---

## 👨‍🎓 Student Role

**Purpose:** Attend events and stay updated

### Can Do:
- Browse all upcoming events
- Register for events (with capacity limits)
- View their registered events
- Unregister from events
- View event calendar

### Dashboard Shows:
- Welcome message
- List of upcoming events
- Quick registration buttons
- User's registered events

### Demo Account:
- Email: `student@demo.com`
- Password: `demo123`

---

## 👔 Club Admin Role

**Purpose:** Organize events for their club

### Can Do:
- Create new events for their club
- Edit their club's events
- Delete their club's events
- Request venue bookings
- View booking status (pending/approved/rejected)
- Cancel bookings
- View events calendar

### Dashboard Shows:
- Create event button
- List of their club's events
- Booking requests and status
- Quick actions for event management

### Demo Accounts:
- **Business Club:** `club@demo.com` / `demo123`
- **Tech Club:** `techclub@demo.com` / `demo123`
- **Cultural Club:** `cultural@demo.com` / `demo123`

---

## 👑 Super Admin Role

**Purpose:** Manage the entire system

### Can Do:
- **User Management:**
  - View all users
  - Change user roles (promote/demote)
  - Delete users
  
- **Venue Management:**
  - Add new venues
  - Edit venue details
  - Delete venues
  - View venue capacity and location
  
- **Booking Management:**
  - View all booking requests
  - Approve booking requests
  - Reject booking requests (with reason)
  - View booking history
  
- **Analytics:**
  - View total users, events, venues
  - See event distribution by category
  - View venue utilization charts
  - Monitor system activity

### Dashboard Shows:
- System statistics (users, events, venues)
- Analytics charts
- Recent booking requests
- Quick access to management features

### Demo Account:
- Email: `admin@demo.com`
- Password: `demo123`

---

## 🔄 Typical Workflows

### 1. Student Registers for an Event
1. Student logs in with `student@demo.com`
2. Navigates to Dashboard or Calendar
3. Finds an interesting event
4. Clicks "Register" button
5. System checks capacity
6. Confirmation shown, event appears in "My Registrations"

### 2. Club Admin Creates an Event & Books Venue
1. Club Admin logs in (e.g., `techclub@demo.com`)
2. Navigates to Dashboard
3. Clicks "Create Event"
4. Fills in event details (name, description, category)
5. Submits event (event is created)
6. Goes to "New Booking" page
7. Selects the event and venue
8. Chooses date and time
9. Submits booking request (status: "pending")
10. Waits for Super Admin approval

### 3. Super Admin Approves Booking
1. Super Admin logs in with `admin@demo.com`
2. Navigates to Dashboard
3. Sees pending booking requests
4. Reviews booking details (date, time, venue)
5. Checks for conflicts
6. Clicks "Approve" button
7. Event appears on public calendar
8. Students can now register for the event

### 4. Super Admin Changes User Role
1. Super Admin navigates to "User Management"
2. Sees list of all users
3. Finds a student who should become club admin
4. Clicks "Change Role" dropdown
5. Selects "club_admin"
6. User can now create events

---

## 🎨 UI/UX Features

### For All Users:
- **Dark/Light Mode Toggle** - Persistent theme preference
- **Responsive Design** - Works on mobile, tablet, desktop
- **Loading States** - Spinners for better UX
- **Error Messages** - Clear feedback on failures
- **Success Notifications** - Confirmation messages

### Navigation:
- **Students:** Calendar, Dashboard, My Registrations
- **Club Admins:** Calendar, Dashboard, Create Event, New Booking
- **Super Admins:** Dashboard, User Management, Venue Management, Analytics

---

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt for secure storage
- **Role-Based Access Control** - Protected routes
- **Input Validation** - Server-side validation
- **Error Handling** - Graceful error responses

---

## 📈 Demo Data Included

When you run `npm run seed`, you get:

### Users (5):
- 1 Student
- 3 Club Admins (Business, Tech, Cultural)
- 1 Super Admin

### Events (8):
- AI & Machine Learning Workshop
- Annual Cultural Fest 2025
- Coding Competition - CodeFest
- Entrepreneurship Seminar
- Web Development Bootcamp
- Music Night - Battle of Bands
- Data Science Seminar
- Hackathon 2025

### Venues (5):
- Main Auditorium (500 capacity)
- Seminar Hall 1 (100 capacity)
- Conference Room (50 capacity)
- Open Air Theatre (1000 capacity)
- Lab Complex (60 capacity)

### Bookings (6):
- 5 Approved bookings
- 1 Pending booking (for testing approval)

### Registrations (3):
- Demo student registered for 3 events

---

## 💡 Tips for Recruiters

1. **Start with Super Admin** - See the full system overview
2. **Check Analytics** - View the analytics dashboard
3. **Approve a Pending Booking** - See the approval workflow
4. **Switch to Club Admin** - Create a test event
5. **Switch to Student** - Register for an event
6. **View Calendar** - See all events in calendar view
7. **Test Dark Mode** - Toggle theme in header
8. **Try Mobile View** - Resize browser to see responsive design

---

## 🐛 Common Questions

**Q: Can I change a user's role after registration?**  
A: Yes! Super Admin can change any user's role from User Management page.

**Q: What happens if two clubs book the same venue at the same time?**  
A: The backend prevents conflicts. The second booking attempt will be rejected.

**Q: Can students create events?**  
A: No, only Club Admins can create events. This maintains organizational structure.

**Q: How do I reset the demo data?**  
A: Run `npm run seed` again to clear and recreate all demo data.

**Q: Can I add more venues or events?**  
A: Yes! Use the Super Admin account to add venues, or Club Admin to create events.

---

## 📞 Support

For any questions about the project, refer to:
- [README.md](README.md) - Full project documentation
- [DEMO_SETUP.md](DEMO_SETUP.md) - Quick setup guide
- This file - Feature details

Happy Exploring! 🎉
