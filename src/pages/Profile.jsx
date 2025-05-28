

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