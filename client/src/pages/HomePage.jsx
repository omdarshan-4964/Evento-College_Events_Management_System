import { useNavigate } from 'react-router-dom';
import { Calendar, CheckSquare, Users } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
        <div className="inline-block p-4 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300">{description}</p>
    </div>
);

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="text-center py-20 sm:py-24 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Manage College Events, <span className="text-indigo-600 dark:text-indigo-400">Effortlessly</span>.
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Evento is the all-in-one platform for managing your college events seamlessly. Book venues, create events, and never miss an opportunity.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-lg shadow-md hover:bg-slate-100 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
          >
            Login
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-100 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">Why Choose Evento?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Calendar size={32} className="text-indigo-600 dark:text-indigo-400" />}
              title="Real-time Calendar"
              description="Instantly view venue availability with a shared calendar. Avoid booking conflicts before they happen."
            />
            <FeatureCard 
              icon={<CheckSquare size={32} className="text-indigo-600 dark:text-indigo-400" />}
              title="Streamlined Booking"
              description="Club admins can create events and request venue bookings in just a few clicks, with a clear approval workflow."
            />
            <FeatureCard 
              icon={<Users size={32} className="text-indigo-600 dark:text-indigo-400" />}
              title="Student Registration"
              description="Students can easily discover and register for upcoming events, with capacity limits automatically handled."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-white dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">&copy; {new Date().getFullYear()} Evento. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;










// import { useNavigate } from 'react-router-dom';
// import { Calendar, CheckSquare, Users } from 'lucide-react';
// // Import your new logos from the assets folder
// import EventoLogo from '../assets/logo.svg';
// import CollegeLogo from '../assets/KIT_Logo.jpg'; 

// const FeatureCard = ({ icon, title, description }) => (
//     <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
//         <div className="inline-block p-4 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4">
//             {icon}
//         </div>
//         <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{title}</h3>
//         <p className="text-slate-600 dark:text-slate-300">{description}</p>
//     </div>
// );

// const HomePage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-slate-50 dark:bg-slate-900">
//       {/* Hero Section */}
//       <section className="relative text-center py-20 sm:py-24 px-4 overflow-hidden">
//         <div className="container mx-auto relative z-10">
            
//             {/* Logos in Top Corners */}
//             <div className="absolute top-8 left-8">
//                 <img src={EventoLogo} alt="Evento Logo" className="h-16 sm:h-20 w-auto" />
//             </div>
//             <div className="absolute top-8 right-8">
//                 <img 
//                     src={CollegeLogo} 
//                     alt="College Logo" 
//                     className="h-16 sm:h-20 w-auto rounded-full"
//                     onError={(e) => { e.target.style.display = 'none'; }}
//                 />
//             </div>

//             {/* Main Content - Added padding-top to give space for logos */}
//             <div className="pt-24">
//                 <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
//                   Manage College Events, <span className="text-indigo-600 dark:text-indigo-400">Effortlessly.</span>
//                 </h1>
                
//                 <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
//                   Evento is the all-in-one platform for your college. Book venues, create events, and never miss an opportunity.
//                 </p>

//                 <div className="mt-10 flex justify-center gap-4">
//                   <button
//                     onClick={() => navigate('/register')}
//                     className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
//                   >
//                     Get Started
//                   </button>
//                   <button
//                     onClick={() => navigate('/login')}
//                     className="px-8 py-3 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-lg shadow-md hover:bg-slate-100 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
//                   >
//                     Login
//                   </button>
//                 </div>
//             </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-slate-100 dark:bg-slate-800/50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">Why Choose Evento?</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <FeatureCard 
//               icon={<Calendar size={32} className="text-indigo-600 dark:text-indigo-400" />}
//               title="Real-time Calendar"
//               description="Instantly view venue availability with a shared calendar. Avoid booking conflicts before they happen."
//             />
//             <FeatureCard 
//               icon={<CheckSquare size={32} className="text-indigo-600 dark:text-indigo-400" />}
//               title="Streamlined Booking"
//               description="Club admins can create events and request venue bookings in just a few clicks, with a clear approval workflow."
//             />
//             <FeatureCard 
//               icon={<Users size={32} className="text-indigo-600 dark:text-indigo-400" />}
//               title="Student Registration"
//               description="Students can easily discover and register for upcoming events, with capacity limits automatically handled."
//             />
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="text-center py-6 bg-white dark:bg-slate-900">
//         <p className="text-slate-500 dark:text-slate-400">&copy; {new Date().getFullYear()} Evento. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;
