// import { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import { useAuth } from "../context/AuthContext";

// const Profile = () => {
//   const { user, logout } = useAuth();
//   const [showPassword, setShowPassword] = useState(false);
//   const [password, setPassword] = useState("********");

//   // This effect ensures password is only available during current session
//   useEffect(() => {
//     if (user?.password) {
//       setPassword(user.password);
//     } else {
//       setPassword("********");
//     }
//   }, [user]);

//   if (!user) {
//     return (
//       <div className="flex">
//         <Sidebar />
//         <div className="flex-1 ml-64 p-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile</h1>
//           <p>No user data available. Please login.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 ml-64 p-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile</h1>

//         <div className="bg-white p-6 rounded-xl shadow-sm">
//           <div className="flex items-center mb-6">
//             <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-semibold">
//               {user?.name?.charAt(0).toUpperCase() ||
//                 user?.email?.charAt(0).toUpperCase()}
//             </div>
//             <div className="ml-4">
//               <h2 className="text-xl font-semibold text-gray-800">
//                 {user?.name || user?.email?.split("@")[0]}
//               </h2>
//               <p className="text-gray-500">{user?.email}</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <h3 className="text-sm font-medium text-gray-500 mb-1">
//                 Your Name
//               </h3>
//               <p className="text-gray-900">{user?.name || "N/A"}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
//               <p className="text-gray-900">{user?.email || "N/A"}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-gray-500 mb-1">
//                 Date of Birth
//               </h3>
//               <p className="text-gray-900">
//                 {user?.date_of_birth
//                   ? new Date(user.date_of_birth).toLocaleDateString()
//                   : "N/A"}
//               </p>
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-gray-500 mb-1">
//                 Permanent Address
//               </h3>
//               <p className="text-gray-900">
//                 {user?.permanent_address || "N/A"}
//               </p>
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-gray-500 mb-1">
//                 Postal Code
//               </h3>
//               <p className="text-gray-900">{user?.postal_code || "N/A"}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-gray-500 mb-1">
//                 Password
//               </h3>
//               <div className="flex items-center">
//                 <p className="text-gray-900 mr-2">
//                   {showPassword ? password : "********"}
//                 </p>
//                 {password !== "********" && (
//                   <button
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="text-sm text-indigo-600 hover:text-indigo-800"
//                   >
//                     {showPassword ? "Hide" : "Show"}
//                   </button>
//                 )}
//               </div>
//               {password === "********" && (
//                 <p className="text-xs text-gray-500 mt-1">
//                   Password only available during current session
//                 </p>
//               )}
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-gray-500 mb-1">
//                 Present Address
//               </h3>
//               <p className="text-gray-900">{user?.present_address || "N/A"}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-gray-500 mb-1">City</h3>
//               <p className="text-gray-900">{user?.city || "N/A"}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-gray-500 mb-1">
//                 Country
//               </h3>
//               <p className="text-gray-900">{user?.country || "N/A"}</p>
//             </div>
//           </div>

//           <div className="mt-8 pt-4 border-t border-gray-200">
//             <button
//               onClick={logout}
//               className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// import { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import { useAuth } from "../context/AuthContext";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiUser, FiMail, FiCalendar, FiHome, FiMapPin, FiLock, FiEye, FiEyeOff, FiLogOut } from "react-icons/fi";
// import { FaCity, FaGlobeAmericas } from "react-icons/fa";

// const Profile = () => {
//   const { user, logout } = useAuth();
//   const [showPassword, setShowPassword] = useState(false);
//   const [password, setPassword] = useState("********");
//   const [isHovering, setIsHovering] = useState(false);

//   useEffect(() => {
//     if (user?.password) {
//       setPassword(user.password);
//     } else {
//       setPassword("********");
//     }
//   }, [user]);

//   if (!user) {
//     return (
//       <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
//         <Sidebar />
//         <div className="flex-1 ml-64 p-8">
//           <motion.h1 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-3xl font-bold text-gray-800 mb-8"
//           >
//             Profile
//           </motion.h1>
//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//             className="text-gray-600"
//           >
//             No user data available. Please login.
//           </motion.p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
//       <Sidebar />
//       <div className="flex-1 ml-64 p-8">
//         <motion.h1 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-3xl font-bold text-gray-800 mb-8"
//         >
//           Your Profile
//         </motion.h1>

//         <motion.div 
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
//         >
//           <div className="flex items-center mb-8">
//             <motion.div 
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="h-20 w-20 rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center text-indigo-600 text-3xl font-semibold shadow-md"
//             >
//               {user?.name?.charAt(0).toUpperCase() ||
//                 user?.email?.charAt(0).toUpperCase()}
//             </motion.div>
//             <div className="ml-6">
//               <motion.h2 
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="text-2xl font-bold text-gray-800"
//               >
//                 {user?.name || user?.email?.split("@")[0]}
//               </motion.h2>
//               <motion.p 
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="text-gray-500 flex items-center"
//               >
//                 <FiMail className="mr-2" /> {user?.email}
//               </motion.p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Name */}
//             <motion.div 
//               whileHover={{ y: -3 }}
//               className="bg-gray-50 p-4 rounded-xl border border-gray-200"
//             >
//               <div className="flex items-center text-gray-500 mb-2">
//                 <FiUser className="mr-2" />
//                 <h3 className="text-sm font-medium">Your Name</h3>
//               </div>
//               <p className="text-gray-900 font-medium">{user?.name || "N/A"}</p>
//             </motion.div>

//             {/* Email */}
//             <motion.div 
//               whileHover={{ y: -3 }}
//               className="bg-gray-50 p-4 rounded-xl border border-gray-200"
//             >
//               <div className="flex items-center text-gray-500 mb-2">
//                 <FiMail className="mr-2" />
//                 <h3 className="text-sm font-medium">Email</h3>
//               </div>
//               <p className="text-gray-900 font-medium">{user?.email || "N/A"}</p>
//             </motion.div>

//             {/* Date of Birth */}
//             <motion.div 
//               whileHover={{ y: -3 }}
//               className="bg-gray-50 p-4 rounded-xl border border-gray-200"
//             >
//               <div className="flex items-center text-gray-500 mb-2">
//                 <FiCalendar className="mr-2" />
//                 <h3 className="text-sm font-medium">Date of Birth</h3>
//               </div>
//               <p className="text-gray-900 font-medium">
//                 {user?.date_of_birth
//                   ? new Date(user.date_of_birth).toLocaleDateString()
//                   : "N/A"}
//               </p>
//             </motion.div>

//             {/* Permanent Address */}
//             <motion.div 
//               whileHover={{ y: -3 }}
//               className="bg-gray-50 p-4 rounded-xl border border-gray-200"
//             >
//               <div className="flex items-center text-gray-500 mb-2">
//                 <FiHome className="mr-2" />
//                 <h3 className="text-sm font-medium">Permanent Address</h3>
//               </div>
//               <p className="text-gray-900 font-medium">
//                 {user?.permanent_address || "N/A"}
//               </p>
//             </motion.div>

//             {/* Postal Code */}
//             <motion.div 
//               whileHover={{ y: -3 }}
//               className="bg-gray-50 p-4 rounded-xl border border-gray-200"
//             >
//               <div className="flex items-center text-gray-500 mb-2">
//                 <FiMapPin className="mr-2" />
//                 <h3 className="text-sm font-medium">Postal Code</h3>
//               </div>
//               <p className="text-gray-900 font-medium">{user?.postal_code || "N/A"}</p>
//             </motion.div>

//             {/* Password */}
//             <motion.div 
//               whileHover={{ y: -3 }}
//               className="bg-gray-50 p-4 rounded-xl border border-gray-200"
//             >
//               <div className="flex items-center text-gray-500 mb-2">
//                 <FiLock className="mr-2" />
//                 <h3 className="text-sm font-medium">Password</h3>
//               </div>
//               <div className="flex items-center">
//                 <p className="text-gray-900 font-medium mr-2">
//                   {showPassword ? password : "********"}
//                 </p>
//                 {password !== "********" && (
//                   <motion.button
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="text-indigo-600 hover:text-indigo-800 flex items-center"
//                   >
//                     {showPassword ? (
//                       <>
//                         <FiEyeOff className="mr-1" /> Hide
//                       </>
//                     ) : (
//                       <>
//                         <FiEye className="mr-1" /> Show
//                       </>
//                     )}
//                   </motion.button>
//                 )}
//               </div>
//               {password === "********" && (
//                 <p className="text-xs text-gray-500 mt-2">
//                   Password only available during current session
//                 </p>
//               )}
//             </motion.div>

//             {/* Present Address */}
//             <motion.div 
//               whileHover={{ y: -3 }}
//               className="bg-gray-50 p-4 rounded-xl border border-gray-200"
//             >
//               <div className="flex items-center text-gray-500 mb-2">
//                 <FiHome className="mr-2" />
//                 <h3 className="text-sm font-medium">Present Address</h3>
//               </div>
//               <p className="text-gray-900 font-medium">
//                 {user?.present_address || "N/A"}
//               </p>
//             </motion.div>

//             {/* City */}
//             <motion.div 
//               whileHover={{ y: -3 }}
//               className="bg-gray-50 p-4 rounded-xl border border-gray-200"
//             >
//               <div className="flex items-center text-gray-500 mb-2">
//                 <FaCity className="mr-2" />
//                 <h3 className="text-sm font-medium">City</h3>
//               </div>
//               <p className="text-gray-900 font-medium">{user?.city || "N/A"}</p>
//             </motion.div>

//             {/* Country */}
//             <motion.div 
//               whileHover={{ y: -3 }}
//               className="bg-gray-50 p-4 rounded-xl border border-gray-200"
//             >
//               <div className="flex items-center text-gray-500 mb-2">
//                 <FaGlobeAmericas className="mr-2" />
//                 <h3 className="text-sm font-medium">Country</h3>
//               </div>
//               <p className="text-gray-900 font-medium">{user?.country || "N/A"}</p>
//             </motion.div>
//           </div>

//           <motion.div 
//             className="mt-8 pt-6 border-t border-gray-200 flex justify-end"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//           >
//             <motion.button
//               onHoverStart={() => setIsHovering(true)}
//               onHoverEnd={() => setIsHovering(false)}
//               onClick={logout}
//               className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 flex items-center shadow-md hover:shadow-lg transition-all duration-300"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <AnimatePresence mode="wait">
//                 {isHovering ? (
//                   <motion.span 
//                     key="logout-text"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="flex items-center"
//                   >
//                     <FiLogOut className="mr-2" /> Sign Out
//                   </motion.span>
//                 ) : (
//                   <motion.span 
//                     key="logout-icon"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="flex items-center"
//                   >
//                     <FiLogOut className="mr-2" /> Logout
//                   </motion.span>
//                 )}
//               </AnimatePresence>
//             </motion.button>
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// import { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import { useAuth } from "../context/AuthContext";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiUser, FiMail, FiCalendar, FiHome, FiMapPin, FiLock, FiEye, FiEyeOff, FiLogOut, FiStar} from "react-icons/fi";
// import { FaCity, FaGlobeAmericas } from "react-icons/fa";
// import { Sparkles } from "lucide-react";
// const Profile = () => {
//   const { user, logout } = useAuth();
//   const [showPassword, setShowPassword] = useState(false);
//   const [password, setPassword] = useState("********");
//   const [isHovering, setIsHovering] = useState(false);

//   useEffect(() => {
//     if (user?.password) {
//       setPassword(user.password);
//     } else {
//       setPassword("********");
//     }
//   }, [user]);

//   // Animated background particles
//   const FloatingParticle = ({ delay = 0 }) => (
//     <motion.div
//       className="absolute w-2 h-2 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-full opacity-20"
//       animate={{
//         y: [0, -100, 0],
//         x: [0, 50, 0],
//         rotate: [0, 360],
//       }}
//       transition={{
//         duration: 20,
//         repeat: Infinity,
//         delay,
//         ease: "linear"
//       }}
//       style={{ 
//         left: `${Math.random() * 100}%`, 
//         top: `${Math.random() * 100}%` 
//       }}
//     />
//   );

//   // Animated icon wrapper
//   const AnimatedIcon = ({ Icon, className = "", delay = 0 }) => (
//     <motion.div
//       initial={{ scale: 0, rotate: -180 }}
//       animate={{ scale: 1, rotate: 0 }}
//       transition={{ 
//         type: "spring", 
//         stiffness: 200, 
//         damping: 15,
//         delay 
//       }}
//       whileHover={{ 
//         scale: 1.1, 
//         rotate: 5,
//         transition: { duration: 0.2 }
//       }}
//       className={className}
//     >
//       <Icon />
//     </motion.div>
//   );

//   if (!user) {
//     return (
//       <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
//         {/* Floating particles */}
//         {[...Array(15)].map((_, i) => (
//           <FloatingParticle key={i} delay={i * 0.5} />
//         ))}
        
//         <Sidebar />
//         <div className="flex-1 ml-64 p-8 relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl"
//           >
//             <motion.h1 
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-8 flex items-center"
//             >
//               <AnimatedIcon Icon={FiUser} className="mr-4 text-purple-300" />
//               Profile
//             </motion.h1>
//             <motion.p 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2, duration: 0.5 }}
//               className="text-purple-200 text-lg"
//             >
//               No user data available. Please login.
//             </motion.p>
//           </motion.div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
//       {/* Animated background elements */}
//       {[...Array(20)].map((_, i) => (
//         <FloatingParticle key={i} delay={i * 0.3} />
//       ))}
      
//       {/* Gradient orbs */}
//       <motion.div 
//         className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
//         animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
//         transition={{ duration: 20, repeat: Infinity }}
//       />
//       <motion.div 
//         className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl"
//         animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
//         transition={{ duration: 25, repeat: Infinity }}
//       />
      
//       <Sidebar />
//       <div className="flex-1 ml-64 p-8 relative z-10">
//         <motion.h1 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-8 flex items-center"
//         >
//           <motion.div
//             animate={{ rotate: [0, 15, -15, 0] }}
//             transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
//             className="mr-4"
//           >
//             <Sparkles className="text-yellow-400" />
//           </motion.div>
//           Your Profile
//         </motion.h1>

//         <motion.div 
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden"
//         >
//           {/* Subtle animated background pattern */}
//           <div className="absolute inset-0 opacity-5">
//             <motion.div
//               className="w-full h-full"
//               style={{
//                 backgroundImage: `radial-gradient(circle at 50% 50%, white 1px, transparent 1px)`,
//                 backgroundSize: '50px 50px'
//               }}
//               animate={{ backgroundPosition: ['0px 0px', '50px 50px'] }}
//               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//             />
//           </div>

//           {/* Profile Header */}
//           <div className="flex items-center mb-10 relative z-10">
//             <motion.div 
//               whileHover={{ scale: 1.05, rotate: 5 }}
//               whileTap={{ scale: 0.95 }}
//               className="relative h-24 w-24 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-400 flex items-center justify-center text-white text-4xl font-bold shadow-2xl border-4 border-white/30"
//               animate={{ 
//                 boxShadow: [
//                   "0 0 20px rgba(168, 85, 247, 0.4)",
//                   "0 0 40px rgba(168, 85, 247, 0.6)",
//                   "0 0 20px rgba(168, 85, 247, 0.4)"
//                 ] 
//               }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               {user?.name?.charAt(0).toUpperCase() ||
//                 user?.email?.charAt(0).toUpperCase()}
//               <motion.div
//                 className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center"
//                 animate={{ rotate: [0, 360] }}
//                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//               >
//                 <FiStar className="w-3 h-3 text-white" />
//               </motion.div>
//             </motion.div>
//             <div className="ml-8">
//               <motion.h2 
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
//               >
//                 {user?.name || user?.email?.split("@")[0]}
//               </motion.h2>
//               <motion.p 
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="text-purple-200 flex items-center text-lg mt-2"
//               >
//                 <AnimatedIcon Icon={FiMail} className="mr-3 text-purple-300" delay={0.4} />
//                 {user?.email}
//               </motion.p>
//             </div>
//           </div>

//           {/* Profile Fields Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
//             {/* Name */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 }}
//               whileHover={{ y: -5, scale: 1.02 }}
//               className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl hover:border-purple-300/50 transition-all duration-300 group"
//             >
//               <div className="flex items-center text-purple-200 mb-3">
//                 <AnimatedIcon Icon={FiUser} className="mr-3 group-hover:text-purple-300 transition-colors" delay={0.1} />
//                 <h3 className="text-sm font-semibold uppercase tracking-wider">Your Name</h3>
//               </div>
//               <p className="text-white font-semibold text-lg">{user?.name || "N/A"}</p>
//             </motion.div>

//             {/* Email */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               whileHover={{ y: -5, scale: 1.02 }}
//               className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl hover:border-purple-300/50 transition-all duration-300 group"
//             >
//               <div className="flex items-center text-purple-200 mb-3">
//                 <AnimatedIcon Icon={FiMail} className="mr-3 group-hover:text-purple-300 transition-colors" delay={0.2} />
//                 <h3 className="text-sm font-semibold uppercase tracking-wider">Email</h3>
//               </div>
//               <p className="text-white font-semibold text-lg">{user?.email || "N/A"}</p>
//             </motion.div>

//             {/* Date of Birth */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               whileHover={{ y: -5, scale: 1.02 }}
//               className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl hover:border-purple-300/50 transition-all duration-300 group"
//             >
//               <div className="flex items-center text-purple-200 mb-3">
//                 <AnimatedIcon Icon={FiCalendar} className="mr-3 group-hover:text-purple-300 transition-colors" delay={0.3} />
//                 <h3 className="text-sm font-semibold uppercase tracking-wider">Date of Birth</h3>
//               </div>
//               <p className="text-white font-semibold text-lg">
//                 {user?.date_of_birth
//                   ? new Date(user.date_of_birth).toLocaleDateString()
//                   : "N/A"}
//               </p>
//             </motion.div>

//             {/* Permanent Address */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               whileHover={{ y: -5, scale: 1.02 }}
//               className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl hover:border-purple-300/50 transition-all duration-300 group"
//             >
//               <div className="flex items-center text-purple-200 mb-3">
//                 <AnimatedIcon Icon={FiHome} className="mr-3 group-hover:text-purple-300 transition-colors" delay={0.4} />
//                 <h3 className="text-sm font-semibold uppercase tracking-wider">Permanent Address</h3>
//               </div>
//               <p className="text-white font-semibold text-lg">
//                 {user?.permanent_address || "N/A"}
//               </p>
//             </motion.div>

//             {/* Postal Code */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               whileHover={{ y: -5, scale: 1.02 }}
//               className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl hover:border-purple-300/50 transition-all duration-300 group"
//             >
//               <div className="flex items-center text-purple-200 mb-3">
//                 <AnimatedIcon Icon={FiMapPin} className="mr-3 group-hover:text-purple-300 transition-colors" delay={0.5} />
//                 <h3 className="text-sm font-semibold uppercase tracking-wider">Postal Code</h3>
//               </div>
//               <p className="text-white font-semibold text-lg">{user?.postal_code || "N/A"}</p>
//             </motion.div>

//             {/* Password */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 }}
//               whileHover={{ y: -5, scale: 1.02 }}
//               className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl hover:border-purple-300/50 transition-all duration-300 group"
//             >
//               <div className="flex items-center text-purple-200 mb-3">
//                 <AnimatedIcon Icon={FiLock} className="mr-3 group-hover:text-purple-300 transition-colors" delay={0.6} />
//                 <h3 className="text-sm font-semibold uppercase tracking-wider">Password</h3>
//               </div>
//               <div className="flex items-center">
//                 <p className="text-white font-semibold text-lg mr-3">
//                   {showPassword ? password : "••••••••"}
//                 </p>
//                 {password !== "********" && (
//                   <motion.button
//                     whileTap={{ scale: 0.9 }}
//                     whileHover={{ scale: 1.1 }}
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="text-purple-300 hover:text-white flex items-center bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-200"
//                   >
//                     <AnimatedIcon 
//                       Icon={showPassword ? FiEyeOff : FiEye} 
//                       className="mr-1" 
//                     />
//                     {showPassword ? "Hide" : "Show"}
//                   </motion.button>
//                 )}
//               </div>
//               {password === "********" && (
//                 <p className="text-xs text-purple-300 mt-2">
//                   Password only available during current session
//                 </p>
//               )}
//             </motion.div>

//             {/* Present Address */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.7 }}
//               whileHover={{ y: -5, scale: 1.02 }}
//               className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl hover:border-purple-300/50 transition-all duration-300 group"
//             >
//               <div className="flex items-center text-purple-200 mb-3">
//                 <AnimatedIcon Icon={FiHome} className="mr-3 group-hover:text-purple-300 transition-colors" delay={0.7} />
//                 <h3 className="text-sm font-semibold uppercase tracking-wider">Present Address</h3>
//               </div>
//               <p className="text-white font-semibold text-lg">
//                 {user?.present_address || "N/A"}
//               </p>
//             </motion.div>

//             {/* City */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8 }}
//               whileHover={{ y: -5, scale: 1.02 }}
//               className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl hover:border-purple-300/50 transition-all duration-300 group"
//             >
//               <div className="flex items-center text-purple-200 mb-3">
//                 <AnimatedIcon Icon={FaCity} className="mr-3 group-hover:text-purple-300 transition-colors" delay={0.8} />
//                 <h3 className="text-sm font-semibold uppercase tracking-wider">City</h3>
//               </div>
//               <p className="text-white font-semibold text-lg">{user?.city || "N/A"}</p>
//             </motion.div>

//             {/* Country */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.9 }}
//               whileHover={{ y: -5, scale: 1.02 }}
//               className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl hover:border-purple-300/50 transition-all duration-300 group"
//             >
//               <div className="flex items-center text-purple-200 mb-3">
//                 <AnimatedIcon Icon={FaGlobeAmericas} className="mr-3 group-hover:text-purple-300 transition-colors" delay={0.9} />
//                 <h3 className="text-sm font-semibold uppercase tracking-wider">Country</h3>
//               </div>
//               <p className="text-white font-semibold text-lg">{user?.country || "N/A"}</p>
//             </motion.div>
//           </div>

//           {/* Logout Button */}
//           <motion.div 
//             className="mt-10 pt-8 border-t border-white/20 flex justify-end relative z-10"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1 }}
//           >
//             <motion.button
//               onHoverStart={() => setIsHovering(true)}
//               onHoverEnd={() => setIsHovering(false)}
//               onClick={logout}
//               className="relative px-8 py-4 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white rounded-2xl font-semibold shadow-2xl border border-red-300/30 overflow-hidden group"
//               whileHover={{ 
//                 scale: 1.05,
//                 boxShadow: "0 0 30px rgba(239, 68, 68, 0.5)"
//               }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {/* Animated background gradient */}
//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-r from-red-600 via-pink-600 to-red-700"
//                 initial={{ x: "-100%" }}
//                 whileHover={{ x: "0%" }}
//                 transition={{ duration: 0.3 }}
//               />
              
//               <AnimatePresence mode="wait">
//                 {isHovering ? (
//                   <motion.span 
//                     key="logout-text"
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="flex items-center relative z-10"
//                   >
//                     <motion.div
//                       animate={{ rotate: [0, 15, -15, 0] }}
//                       transition={{ duration: 0.5 }}
//                     >
//                       <FiLogOut className="mr-2" />
//                     </motion.div>
//                     Sign Out
//                   </motion.span>
//                 ) : (
//                   <motion.span 
//                     key="logout-icon"
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="flex items-center relative z-10"
//                   >
//                     <FiLogOut className="mr-2" /> Logout
//                   </motion.span>
//                 )}
//               </AnimatePresence>
//             </motion.button>
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// import { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import { useAuth } from "../context/AuthContext";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   FiUser, 
//   FiMail, 
//   FiCalendar, 
//   FiHome, 
//   FiMapPin, 
//   FiLock, 
//   FiEye, 
//   FiEyeOff, 
//   FiLogOut, 
//   FiStar,
//   FiEdit3,
//   FiCheck,
//   FiX
// } from "react-icons/fi";
// import { FaCity, FaGlobeAmericas } from "react-icons/fa";
// import { Sparkles, Shield, Heart, Zap } from "lucide-react";

// const Profile = () => {
//   const { user, logout } = useAuth();
//   const [showPassword, setShowPassword] = useState(false);
//   const [password, setPassword] = useState("********");
//   const [isHovering, setIsHovering] = useState(false);
//   const [glitterParticles, setGlitterParticles] = useState([]);
//   const [editingField, setEditingField] = useState(null);

//   useEffect(() => {
//     if (user?.password) {
//       setPassword(user.password);
//     } else {
//       setPassword("********");
//     }
//   }, [user]);

//   // Generate glitter particles similar to sidebar
//   useEffect(() => {
//     generateGlitterParticles();
//     const interval = setInterval(generateGlitterParticles, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const generateGlitterParticles = () => {
//     const newParticles = [];
//     const colors = ["#4F46E5", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6", "#06B6D4"];
    
//     for (let i = 0; i < 25; i++) {
//       newParticles.push({
//         id: `particle-${Date.now()}-${i}`,
//         left: `${Math.random() * 100}%`,
//         top: `${Math.random() * 100}%`,
//         size: `${Math.random() * 4 + 1}px`,
//         duration: `${Math.random() * 3 + 2}s`,
//         delay: `${Math.random() * 2}s`,
//         color: colors[Math.floor(Math.random() * colors.length)],
//       });
//     }
//     setGlitterParticles(newParticles);
//   };

//   // Animated floating particles
//   const FloatingParticle = ({ particle }) => (
//     <motion.div
//       key={particle.id}
//       className="absolute rounded-full pointer-events-none"
//       style={{
//         left: particle.left,
//         top: particle.top,
//         width: particle.size,
//         height: particle.size,
//         backgroundColor: particle.color,
//         boxShadow: `0 0 6px ${particle.color}`,
//       }}
//       animate={{
//         y: [0, -100, 0],
//         x: [0, 50, 0],
//         opacity: [0, 0.8, 0],
//         scale: [0.5, 1, 0.5],
//       }}
//       transition={{
//         duration: parseFloat(particle.duration),
//         repeat: Infinity,
//         delay: parseFloat(particle.delay),
//         ease: "easeInOut"
//       }}
//     />
//   );

//   // Animated icon wrapper with consistent styling
//   const AnimatedIcon = ({ Icon, className = "", delay = 0, color = "text-indigo-500" }) => (
//     <motion.div
//       initial={{ scale: 0, rotate: -180 }}
//       animate={{ scale: 1, rotate: 0 }}
//       transition={{ 
//         type: "spring", 
//         stiffness: 200, 
//         damping: 15,
//         delay 
//       }}
//       whileHover={{ 
//         scale: 1.1, 
//         rotate: 5,
//         transition: { duration: 0.2 }
//       }}
//       className={`${color} ${className}`}
//     >
//       <Icon />
//     </motion.div>
//   );

//   // Profile field data with consistent color scheme
//   const profileFields = [
//     {
//       key: "name",
//       label: "Full Name",
//       value: user?.name || "Not provided",
//       icon: FiUser,
//       color: "indigo",
//       gradient: "from-indigo-500/20 to-indigo-500/5",
//       iconColor: "text-indigo-500",
//       borderColor: "border-indigo-500/30",
//       delay: 0.1
//     },
//     {
//       key: "email",
//       label: "Email Address",
//       value: user?.email || "Not provided",
//       icon: FiMail,
//       color: "emerald",
//       gradient: "from-emerald-500/20 to-emerald-500/5",
//       iconColor: "text-emerald-500",
//       borderColor: "border-emerald-500/30",
//       delay: 0.2
//     },
//     {
//       key: "date_of_birth",
//       label: "Date of Birth",
//       value: user?.date_of_birth 
//         ? new Date(user.date_of_birth).toLocaleDateString()
//         : "Not provided",
//       icon: FiCalendar,
//       color: "purple",
//       gradient: "from-purple-500/20 to-purple-500/5",
//       iconColor: "text-purple-500",
//       borderColor: "border-purple-500/30",
//       delay: 0.3
//     },
//     {
//       key: "permanent_address",
//       label: "Permanent Address",
//       value: user?.permanent_address || "Not provided",
//       icon: FiHome,
//       color: "pink",
//       gradient: "from-pink-500/20 to-pink-500/5",
//       iconColor: "text-pink-500",
//       borderColor: "border-pink-500/30",
//       delay: 0.4
//     },
//     {
//       key: "present_address",
//       label: "Present Address",
//       value: user?.present_address || "Not provided",
//       icon: FiHome,
//       color: "cyan",
//       gradient: "from-cyan-500/20 to-cyan-500/5",
//       iconColor: "text-cyan-500",
//       borderColor: "border-cyan-500/30",
//       delay: 0.5
//     },
//     {
//       key: "city",
//       label: "City",
//       value: user?.city || "Not provided",
//       icon: FaCity,
//       color: "amber",
//       gradient: "from-amber-500/20 to-amber-500/5",
//       iconColor: "text-amber-500",
//       borderColor: "border-amber-500/30",
//       delay: 0.6
//     },
//     {
//       key: "postal_code",
//       label: "Postal Code",
//       value: user?.postal_code || "Not provided",
//       icon: FiMapPin,
//       color: "rose",
//       gradient: "from-rose-500/20 to-rose-500/5",
//       iconColor: "text-rose-500",
//       borderColor: "border-rose-500/30",
//       delay: 0.7
//     },
//     {
//       key: "country",
//       label: "Country",
//       value: user?.country || "Not provided",
//       icon: FaGlobeAmericas,
//       color: "violet",
//       gradient: "from-violet-500/20 to-violet-500/5",
//       iconColor: "text-violet-500",
//       borderColor: "border-violet-500/30",
//       delay: 0.8
//     }
//   ];

//   if (!user) {
//     return (
//       <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
//         {/* Floating particles */}
//         {glitterParticles.map((particle) => (
//           <FloatingParticle key={particle.id} particle={particle} />
//         ))}
        
//         <Sidebar />
//         <div className="flex-1 ml-64 p-8 relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-12 border border-gray-200 dark:border-gray-700 shadow-2xl"
//           >
//             <motion.h1 
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-indigo-600 dark:from-white dark:to-indigo-400 bg-clip-text text-transparent mb-8 flex items-center"
//             >
//               <AnimatedIcon Icon={FiUser} className="mr-4" color="text-indigo-500" />
//               Profile
//             </motion.h1>
//             <motion.p 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2, duration: 0.5 }}
//               className="text-gray-600 dark:text-gray-300 text-lg"
//             >
//               No user data available. Please login.
//             </motion.p>
//           </motion.div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
//       {/* Animated background elements */}
//       {glitterParticles.map((particle) => (
//         <FloatingParticle key={particle.id} particle={particle} />
//       ))}
      
//       {/* Gradient orbs similar to sidebar design */}
//       <motion.div 
//         className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"
//         animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
//         transition={{ duration: 20, repeat: Infinity }}
//       />
//       <motion.div 
//         className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"
//         animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
//         transition={{ duration: 25, repeat: Infinity }}
//       />
      
//       <Sidebar />
//       <div className="flex-1 ml-64 p-8 relative z-10">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mb-8"
//         >
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-indigo-600 to-purple-600 dark:from-white dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent flex items-center">
//             <motion.div
//               animate={{ rotate: [0, 15, -15, 0] }}
//               transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
//               className="mr-4"
//             >
//               <Sparkles className="text-indigo-500" size={32} />
//             </motion.div>
//             Your Profile
//           </h1>
//           <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
//             Manage your personal information and account settings
//           </p>
//         </motion.div>

//         <motion.div 
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 relative overflow-hidden"
//         >
//           {/* Subtle animated background pattern */}
//           <div className="absolute inset-0 opacity-5 dark:opacity-10">
//             <motion.div
//               className="w-full h-full"
//               style={{
//                 backgroundImage: `radial-gradient(circle at 50% 50%, currentColor 1px, transparent 1px)`,
//                 backgroundSize: '50px 50px'
//               }}
//               animate={{ backgroundPosition: ['0px 0px', '50px 50px'] }}
//               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//             />
//           </div>

//           {/* Profile Header */}
//           <div className="flex items-center mb-10 relative z-10">
//             <motion.div 
//               whileHover={{ scale: 1.05, rotate: 5 }}
//               whileTap={{ scale: 0.95 }}
//               className="relative h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold shadow-2xl border-4 border-white dark:border-gray-700"
//               animate={{ 
//                 boxShadow: [
//                   "0 0 20px rgba(79, 70, 229, 0.4)",
//                   "0 0 40px rgba(79, 70, 229, 0.6)",
//                   "0 0 20px rgba(79, 70, 229, 0.4)"
//                 ] 
//               }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               {user?.name?.charAt(0).toUpperCase() ||
//                 user?.email?.charAt(0).toUpperCase()}
              
//               {/* Status indicators */}
//               <motion.div
//                 className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center"
//                 animate={{ rotate: [0, 360] }}
//                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//               >
//                 <Shield className="w-3 h-3 text-white" />
//               </motion.div>
              
//               <motion.div
//                 className="absolute -bottom-1 -left-1 w-5 h-5 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center"
//                 animate={{ scale: [1, 1.2, 1] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//               >
//                 <Heart className="w-2 h-2 text-white" />
//               </motion.div>
//             </motion.div>
            
//             <div className="ml-8">
//               <motion.h2 
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-indigo-600 dark:from-white dark:to-indigo-400 bg-clip-text text-transparent"
//               >
//                 {user?.name || user?.email?.split("@")[0]}
//               </motion.h2>
//               <motion.p 
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="text-gray-600 dark:text-gray-300 flex items-center text-lg mt-2"
//               >
//                 <AnimatedIcon Icon={FiMail} className="mr-3" color="text-emerald-500" delay={0.4} />
//                 {user?.email}
//               </motion.p>
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.4 }}
//                 className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400"
//               >
//                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></div>
//                 Active Account
//               </motion.div>
//             </div>
//           </div>

//           {/* Profile Fields Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-8">
//             {profileFields.map((field) => (
//               <motion.div 
//                 key={field.key}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: field.delay }}
//                 whileHover={{ y: -5, scale: 1.02 }}
//                 className={`bg-gradient-to-r ${field.gradient} backdrop-blur-sm p-6 rounded-2xl border ${field.borderColor} hover:border-opacity-70 shadow-lg hover:shadow-2xl transition-all duration-300 group relative overflow-hidden`}
//               >
//                 {/* Shine effect */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
//                 <div className="flex items-center justify-between mb-3">
//                   <div className="flex items-center text-gray-600 dark:text-gray-300">
//                     <AnimatedIcon 
//                       Icon={field.icon} 
//                       className="mr-3 group-hover:scale-110 transition-transform" 
//                       color={field.iconColor}
//                       delay={field.delay} 
//                     />
//                     <h3 className="text-sm font-semibold uppercase tracking-wider">
//                       {field.label}
//                     </h3>
//                   </div>
                  
//                   {field.key !== 'email' && (
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       className={`${field.iconColor} opacity-0 group-hover:opacity-100 transition-all duration-300 p-1 rounded-full hover:bg-white/20`}
//                       onClick={() => setEditingField(field.key)}
//                     >
//                       <FiEdit3 size={14} />
//                     </motion.button>
//                   )}
//                 </div>
                
//                 <p className="text-gray-800 dark:text-white font-semibold text-lg">
//                   {field.value}
//                 </p>
//               </motion.div>
//             ))}

//             {/* Password Field - Special styling */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.9 }}
//               whileHover={{ y: -5, scale: 1.02 }}
//               className="bg-gradient-to-r from-red-500/20 to-red-500/5 backdrop-blur-sm p-6 rounded-2xl border border-red-500/30 hover:border-red-500/70 shadow-lg hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
//               <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
//                 <AnimatedIcon Icon={FiLock} className="mr-3" color="text-red-500" delay={0.9} />
//                 <h3 className="text-sm font-semibold uppercase tracking-wider">Password</h3>
//               </div>
              
//               <div className="flex items-center justify-between">
//                 <p className="text-gray-800 dark:text-white font-semibold text-lg">
//                   {showPassword ? password : "••••••••"}
//                 </p>
                
//                 {password !== "********" && (
//                   <motion.button
//                     whileTap={{ scale: 0.9 }}
//                     whileHover={{ scale: 1.1 }}
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="text-red-500 hover:text-red-600 dark:hover:text-red-400 flex items-center bg-white/20 dark:bg-gray-700/50 px-3 py-1 rounded-lg backdrop-blur-sm border border-red-200 dark:border-red-500/30 transition-all duration-200"
//                   >
//                     <AnimatedIcon 
//                       Icon={showPassword ? FiEyeOff : FiEye} 
//                       className="mr-1" 
//                       color="text-red-500"
//                     />
//                     {showPassword ? "Hide" : "Show"}
//                   </motion.button>
//                 )}
//               </div>
              
//               {password === "********" && (
//                 <p className="text-xs text-red-400 mt-2">
//                   Password only available during current session
//                 </p>
//               )}
//             </motion.div>
//           </div>

//           {/* Action Buttons */}
//           <motion.div 
//             className="pt-8 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center relative z-10"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1 }}
//           >
//             <div className="flex gap-4">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg border border-indigo-300/30 flex items-center gap-2 hover:shadow-xl transition-all duration-300"
//               >
//                 <FiEdit3 className="w-4 h-4" />
//                 Edit Profile
//               </motion.button>
              
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold shadow-lg border border-emerald-300/30 flex items-center gap-2 hover:shadow-xl transition-all duration-300"
//               >
//                 <Zap className="w-4 h-4" />
//                 Upgrade Account
//               </motion.button>
//             </div>

//             <motion.button
//               onHoverStart={() => setIsHovering(true)}
//               onHoverEnd={() => setIsHovering(false)}
//               onClick={logout}
//               className="relative px-8 py-4 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white rounded-2xl font-semibold shadow-2xl border border-red-300/30 overflow-hidden group"
//               whileHover={{ 
//                 scale: 1.05,
//                 boxShadow: "0 0 30px rgba(239, 68, 68, 0.5)"
//               }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-r from-red-600 via-pink-600 to-red-700"
//                 initial={{ x: "-100%" }}
//                 whileHover={{ x: "0%" }}
//                 transition={{ duration: 0.3 }}
//               />
              
//               <AnimatePresence mode="wait">
//                 {isHovering ? (
//                   <motion.span 
//                     key="logout-text"
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="flex items-center relative z-10"
//                   >
//                     <motion.div
//                       animate={{ rotate: [0, 15, -15, 0] }}
//                       transition={{ duration: 0.5 }}
//                     >
//                       <FiLogOut className="mr-2" />
//                     </motion.div>
//                     Sign Out
//                   </motion.span>
//                 ) : (
//                   <motion.span 
//                     key="logout-icon"
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="flex items-center relative z-10"
//                   >
//                     <FiLogOut className="mr-2" /> Logout
//                   </motion.span>
//                 )}
//               </AnimatePresence>
//             </motion.button>
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiMail, FiCalendar, FiHome, FiMapPin, FiLock, FiEye, FiEyeOff, FiLogOut, FiStar} from "react-icons/fi";
import { FaCity, FaGlobeAmericas } from "react-icons/fa";
import { Sparkles } from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("********");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (user?.password) {
      setPassword(user.password);
    } else {
      setPassword("********");
    }
  }, [user]);

  // Animated background particles
  const FloatingParticle = ({ delay = 0 }) => (
    <motion.div
      className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30"
      animate={{
        y: [0, -100, 0],
        x: [0, 50, 0],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        delay,
        ease: "linear"
      }}
      style={{ 
        left: `${Math.random() * 100}%`, 
        top: `${Math.random() * 100}%` 
      }}
    />
  );

  // Animated icon wrapper
  const AnimatedIcon = ({ Icon, className = "", delay = 0 }) => (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 15,
        delay 
      }}
      whileHover={{ 
        scale: 1.1, 
        rotate: 5,
        transition: { duration: 0.2 }
      }}
      className={className}
    >
      <Icon />
    </motion.div>
  );

  if (!user) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} />
        ))}
        
        <Sidebar />
        <div className="flex-1 ml-64 p-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl p-12 border border-gray-200/50 shadow-2xl"
          >
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-purple-600 bg-clip-text text-transparent mb-8 flex items-center"
            >
              <AnimatedIcon Icon={FiUser} className="mr-4 text-purple-500" />
              Profile
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-gray-600 text-lg"
            >
              No user data available. Please login.
            </motion.p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      {[...Array(20)].map((_, i) => (
        <FloatingParticle key={i} delay={i * 0.3} />
      ))}
      
      {/* Gradient orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-200/30 to-pink-200/30 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
      />
      
      <Sidebar />
      <div className="flex-1 ml-64 p-8 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-8 flex items-center"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="mr-4"
          >
            <Sparkles className="text-amber-500" />
          </motion.div>
          Your Profile
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-gray-200/50 relative overflow-hidden"
        >
          {/* Subtle animated background pattern */}
          <div className="absolute inset-0 opacity-5">
            <motion.div
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, #6366f1 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}
              animate={{ backgroundPosition: ['0px 0px', '50px 50px'] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Profile Header */}
          <div className="flex items-center mb-10 relative z-10">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 flex items-center justify-center text-white text-4xl font-bold shadow-2xl border-4 border-white"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(99, 102, 241, 0.4)",
                  "0 0 40px rgba(99, 102, 241, 0.6)",
                  "0 0 20px rgba(99, 102, 241, 0.4)"
                ] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {user?.name?.charAt(0).toUpperCase() ||
                user?.email?.charAt(0).toUpperCase()}
              <motion.div
                className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <FiStar className="w-3 h-3 text-white" />
              </motion.div>
            </motion.div>
            <div className="ml-8">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-purple-600 bg-clip-text text-transparent"
              >
                {user?.name || user?.email?.split("@")[0]}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 flex items-center text-lg mt-2"
              >
                <AnimatedIcon Icon={FiMail} className="mr-3 text-purple-500" delay={0.4} />
                {user?.email}
              </motion.p>
            </div>
          </div>

          {/* Profile Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {/* Name */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/70 shadow-lg hover:shadow-xl hover:border-purple-300/70 transition-all duration-300 group"
            >
              <div className="flex items-center text-gray-600 mb-3">
                <AnimatedIcon Icon={FiUser} className="mr-3 group-hover:text-purple-600 transition-colors" delay={0.1} />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Your Name</h3>
              </div>
              <p className="text-gray-800 font-semibold text-lg">{user?.name || "N/A"}</p>
            </motion.div>

            {/* Email */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/70 shadow-lg hover:shadow-xl hover:border-purple-300/70 transition-all duration-300 group"
            >
              <div className="flex items-center text-gray-600 mb-3">
                <AnimatedIcon Icon={FiMail} className="mr-3 group-hover:text-purple-600 transition-colors" delay={0.2} />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Email</h3>
              </div>
              <p className="text-gray-800 font-semibold text-lg">{user?.email || "N/A"}</p>
            </motion.div>

            {/* Date of Birth */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/70 shadow-lg hover:shadow-xl hover:border-purple-300/70 transition-all duration-300 group"
            >
              <div className="flex items-center text-gray-600 mb-3">
                <AnimatedIcon Icon={FiCalendar} className="mr-3 group-hover:text-purple-600 transition-colors" delay={0.3} />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Date of Birth</h3>
              </div>
              <p className="text-gray-800 font-semibold text-lg">
                {user?.date_of_birth
                  ? new Date(user.date_of_birth).toLocaleDateString()
                  : "N/A"}
              </p>
            </motion.div>

            {/* Permanent Address */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/70 shadow-lg hover:shadow-xl hover:border-purple-300/70 transition-all duration-300 group"
            >
              <div className="flex items-center text-gray-600 mb-3">
                <AnimatedIcon Icon={FiHome} className="mr-3 group-hover:text-purple-600 transition-colors" delay={0.4} />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Permanent Address</h3>
              </div>
              <p className="text-gray-800 font-semibold text-lg">
                {user?.permanent_address || "N/A"}
              </p>
            </motion.div>

            {/* Postal Code */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/70 shadow-lg hover:shadow-xl hover:border-purple-300/70 transition-all duration-300 group"
            >
              <div className="flex items-center text-gray-600 mb-3">
                <AnimatedIcon Icon={FiMapPin} className="mr-3 group-hover:text-purple-600 transition-colors" delay={0.5} />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Postal Code</h3>
              </div>
              <p className="text-gray-800 font-semibold text-lg">{user?.postal_code || "N/A"}</p>
            </motion.div>

            {/* Password */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/70 shadow-lg hover:shadow-xl hover:border-purple-300/70 transition-all duration-300 group"
            >
              <div className="flex items-center text-gray-600 mb-3">
                <AnimatedIcon Icon={FiLock} className="mr-3 group-hover:text-purple-600 transition-colors" delay={0.6} />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Password</h3>
              </div>
              <div className="flex items-center">
                <p className="text-gray-800 font-semibold text-lg mr-3">
                  {showPassword ? password : "••••••••"}
                </p>
                {password !== "********" && (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-purple-600 hover:text-purple-800 flex items-center bg-white/70 px-3 py-1 rounded-lg backdrop-blur-sm border border-gray-200/70 transition-all duration-200"
                  >
                    <AnimatedIcon 
                      Icon={showPassword ? FiEyeOff : FiEye} 
                      className="mr-1" 
                    />
                    {showPassword ? "Hide" : "Show"}
                  </motion.button>
                )}
              </div>
              {password === "********" && (
                <p className="text-xs text-gray-500 mt-2">
                  Password only available during current session
                </p>
              )}
            </motion.div>

            {/* Present Address */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/70 shadow-lg hover:shadow-xl hover:border-purple-300/70 transition-all duration-300 group"
            >
              <div className="flex items-center text-gray-600 mb-3">
                <AnimatedIcon Icon={FiHome} className="mr-3 group-hover:text-purple-600 transition-colors" delay={0.7} />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Present Address</h3>
              </div>
              <p className="text-gray-800 font-semibold text-lg">
                {user?.present_address || "N/A"}
              </p>
            </motion.div>

            {/* City */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/70 shadow-lg hover:shadow-xl hover:border-purple-300/70 transition-all duration-300 group"
            >
              <div className="flex items-center text-gray-600 mb-3">
                <AnimatedIcon Icon={FaCity} className="mr-3 group-hover:text-purple-600 transition-colors" delay={0.8} />
                <h3 className="text-sm font-semibold uppercase tracking-wider">City</h3>
              </div>
              <p className="text-gray-800 font-semibold text-lg">{user?.city || "N/A"}</p>
            </motion.div>

            {/* Country */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/70 shadow-lg hover:shadow-xl hover:border-purple-300/70 transition-all duration-300 group"
            >
              <div className="flex items-center text-gray-600 mb-3">
                <AnimatedIcon Icon={FaGlobeAmericas} className="mr-3 group-hover:text-purple-600 transition-colors" delay={0.9} />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Country</h3>
              </div>
              <p className="text-gray-800 font-semibold text-lg">{user?.country || "N/A"}</p>
            </motion.div>
          </div>

          {/* Logout Button */}
      
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;