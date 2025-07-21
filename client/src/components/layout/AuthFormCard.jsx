// import { Link } from 'react-router-dom';

// import Event_Image from '../../assets/Event_Image.png';

// const AuthFormCard = ({ title, children }) => (
//     <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900">
//         {/* Left decorative pane (hidden on small screens) */}
//         <div className="hidden lg:flex w-1/2 bg-indigo-700 dark:bg-indigo-900 items-center justify-center relative p-12">
//             {/* You can add a background image here if you want */}
//             <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(${Event_Image})'}}></div>
//             <div className="relative z-10 text-white text-center">
//                 <Link to="/" className="mb-8 inline-block">
//                     <h1 className="text-4xl font-bold">Evento</h1>
//                 </Link>
//                 <p className="text-xl text-indigo-200">
//                     Your all-in-one platform for managing college events seamlessly.
//                 </p>
//             </div>
//         </div>

//         {/* Right form pane */}
//         <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
//             <div className="w-full max-w-md">
//                 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 space-y-6">
//                     <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white">{title}</h2>
//                     {children}
//                 </div>
//             </div>
//         </div>
//     </div>
// );

// export default AuthFormCard;




import { Link } from 'react-router-dom';
import Event_Image from '../../assets/Event_Image.png'; // Make sure this path is correct

const AuthFormCard = ({ title, children }) => (
  <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900">
    {/* Left decorative pane */}
    <div className="hidden lg:flex w-1/2 bg-indigo-700 dark:bg-indigo-900 items-center justify-center relative p-12">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${Event_Image})` }}
      ></div>
      <div className="relative z-10 text-white text-center">
        <Link to="/" className="mb-8 inline-block">
          <h1 className="text-4xl font-bold">Evento</h1>
        </Link>
        <p className="text-xl text-indigo-200">
          Your all-in-one platform for managing college events seamlessly.
        </p>
      </div>
    </div>

    {/* Right form pane */}
    <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 space-y-6">
          <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default AuthFormCard;
