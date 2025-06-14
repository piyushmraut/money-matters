import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import {
  HomeIcon,
  CreditCardIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  Bars3Icon,
  SparklesIcon,
  CurrencyDollarIcon,
  BellIcon,
  CogIcon,
  ChartPieIcon,
} from "@heroicons/react/24/solid";

const Sidebar = () => {
  const { user, logout, isAdmin } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovering, setIsHovering] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [glitterParticles, setGlitterParticles] = useState([]);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
        setIsMobile(true);
      } else {
        setIsCollapsed(false); // Always expanded on desktop
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animate entrance
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Generate glitter particles
  useEffect(() => {
    // Create initial particles
    generateGlitterParticles();

    // Regenerate particles every 3 seconds
    const interval = setInterval(generateGlitterParticles, 3000);
    return () => clearInterval(interval);
  }, [isCollapsed]);

  const generateGlitterParticles = () => {
    const newParticles = [];
    const count = isCollapsed ? 15 : 30;

    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: `particle-${Date.now()}-${i}`,
        left: `${Math.random() * (isCollapsed ? 80 : 256)}px`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 4 + 1}px`,
        duration: `${Math.random() * 3 + 2}s`,
        delay: `${Math.random() * 2}s`,
        color: getRandomColor(),
      });
    }

    setGlitterParticles(newParticles);
  };

  const getRandomColor = () => {
    const colors = [
      "#4F46E5", // indigo
      "#10B981", // emerald
      "#F59E0B", // amber
      "#EC4899", // pink
      "#8B5CF6", // violet
      "#06B6D4", // cyan
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Update the navItems array in src/components/Sidebar.jsx
const navItems = [
  {
    name: "Dashboard",
    path: isAdmin ? "/admin/dashboard" : "/",
    icon: (active, hovering) => (
      <div className="relative">
        <HomeIcon
          className={`w-6 h-6 transition-all duration-300 ${
            active || hovering ? "text-purple-600 scale-110" : "text-gray-500"
          }`}
        />
        {(active || hovering) && (
          <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-purple-600 rounded-full animate-ping" />
        )}
      </div>
    ),
    bgColor: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500",
    textColor: "text-purple-600",
  },
  {
    name: "Transactions",
    path: isAdmin ? "/admin/transactions" : "/transactions",
    icon: (active, hovering) => (
      <div className="relative">
        <CurrencyDollarIcon
          className={`w-6 h-6 transition-all duration-300 ${
            active || hovering
              ? "text-emerald-500 scale-110"
              : "text-gray-500"
          }`}
        />
        {(active || hovering) && (
          <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
        )}
      </div>
    ),
    bgColor: "from-emerald-500/20 to-emerald-500/5",
    borderColor: "border-emerald-500",
    textColor: "text-emerald-600",
  },
  {
    name: "Profile",
    path: isAdmin ? "/admin/profile" : "/profile",
    icon: (active, hovering) => (
      <div className="relative">
        <UserIcon
          className={`w-6 h-6 transition-all duration-300 ${
            active || hovering ? "text-pink-500 scale-110" : "text-gray-500"
          }`}
        />
        {(active || hovering) && (
          <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-pink-500 rounded-full animate-ping" />
        )}
      </div>
    ),
    bgColor: "from-pink-500/20 to-pink-500/5",
    borderColor: "border-pink-500",
    textColor: "text-pink-600",
  },
];

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="fixed top-4 left-4 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-2 rounded-full shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
        >
          <Bars3Icon className="w-5 h-5" />
        </button>
      )}

      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-300 ${
          isVisible && isMobile
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsVisible(false)}
      />

      <div
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } bg-white dark:bg-gray-900 h-screen fixed left-0 top-0 shadow-xl z-40 transition-all duration-500 ease-in-out ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        } ${isMobile ? "rounded-r-2xl" : ""} overflow-hidden`}
      >
        {/* Glitter particles - these move around the sidebar */}
        {glitterParticles.map((particle) => (
          <span
            key={particle.id}
            className="absolute rounded-full pointer-events-none animate-float"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: 0.7,
              boxShadow: `0 0 6px ${particle.color}`,
              animationDuration: particle.duration,
              animationDelay: particle.delay,
            }}
          />
        ))}

        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md z-0" />

        <div className="h-full flex flex-col justify-between z-10 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 opacity-90" />

          {/* Animated decorative circles */}
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-indigo-500 rounded-full opacity-10 animate-pulse" />
          <div
            className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500 rounded-full opacity-10 animate-pulse"
            style={{ animationDelay: "1s" }}
          />

          <div className="relative z-10">
            {/* Collapse toggle button - only shown on mobile */}
            {isMobile && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-10 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-1 rounded-full shadow-lg hover:shadow-indigo-500/50 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-110"
              >
                {isCollapsed ? (
                  <ChevronRightIcon className=" w-8 h-4" />
                ) : (
                  <ChevronLeftIcon className=" w-8 h-4" />
                )}
              </button>
            )}

            {/* Logo */}
            <div
              className={`flex items-center ${
                isCollapsed ? "justify-center p-4" : "px-6 py-8"
              } transition-all duration-300`}
            >
              <div className="relative overflow-hidden">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-lg  shadow-lg transform transition-all duration-300 hover:scale-110">
                  <svg
                    width="44"
                    height="38"
                    viewBox="0 0 44 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.3509 11.1367C29.8451 6.71605 28.7706 2.94096 27.6895 0C25.8811 0.334497 23.7781 0.6087 21.419 0.71431C18.3655 0.850644 15.6396 0.670914 13.3691 0.384422C14.2593 1.84453 15.153 3.53699 15.9395 5.45487C16.2667 6.25252 16.5486 7.02482 16.7925 7.76601C16.4468 6.0605 16.1012 4.35499 15.7556 2.64948C16.9234 2.71054 18.1281 2.75125 19.3667 2.76737C21.7757 2.79887 24.0538 2.73435 26.1879 2.60301C26.7986 4.12034 27.3696 5.74251 27.8719 7.46608C29.8785 14.3523 30.1043 20.5253 29.7353 25.3922C30.4542 21.8844 31.0199 16.986 30.3509 11.1363V11.1367Z"
                      fill="#60C7CA"
                    />
                    <path
                      d="M33.1462 4.17485C31.6719 3.87338 30.3727 3.47936 29.2678 3.07458C29.4479 3.69442 29.628 4.31387 29.8085 4.93371C30.6876 5.2444 31.6853 5.54625 32.7925 5.8001C33.8801 6.04972 34.8924 6.2114 35.8053 6.31509C35.4028 10.0349 34.5764 14.6268 32.8812 19.6961C31.5117 23.7907 29.8869 27.2659 28.3423 30.0889C31.2057 26.1572 34.672 20.2902 36.6494 12.5818C37.3756 9.75108 37.7908 7.10199 38.0116 4.71558C36.6275 4.68793 34.9765 4.54852 33.1462 4.17447V4.17485Z"
                      fill="#00B4B7"
                    />
                    <path
                      d="M40.5364 11.8753C39.6792 11.3496 38.8781 10.82 38.1315 10.2961C37.9614 10.9164 37.7917 11.537 37.6215 12.1572C38.4453 12.8389 39.4027 13.5409 40.5034 14.2095C40.9327 14.4702 41.3548 14.7083 41.7657 14.9253C40.0168 18.3893 37.3888 22.7032 33.4678 27.0563C30.9969 29.7995 28.5241 31.9908 26.3013 33.7171C29.2564 31.9532 33.3875 29.023 37.3078 24.4176C40.6347 20.5092 42.712 16.6846 43.9996 13.802C42.899 13.2498 41.7369 12.6119 40.536 11.8757L40.5364 11.8753Z"
                      fill="#02969C"
                    />
                    <path
                      d="M36.5278 26.2317C36.2609 26.4859 35.9878 26.734 35.7094 26.9756C32.379 32.7914 26.1562 35.3207 19 35C8.80457 34.543 2.04261 27.1958 2.5 17C2.82029 9.85728 5.857 3.82117 11.9298 1.0177C5.22257 3.76779 0.366034 10.2158 0.0196323 17.9338C-0.455422 28.529 7.74877 37.5036 18.344 37.9786C26.8861 38.3615 34.3745 33.1033 37.2048 25.4986C36.9982 25.7647 36.7724 25.999 36.5278 26.2317Z"
                      fill="#F89A23"
                    />
                    <path
                      d="M25.0263 19.7258C24.7161 19.0645 24.2711 18.5011 23.7028 18.05C23.1701 17.6275 22.5333 17.2829 21.8101 17.026C21.3811 16.8736 20.9181 16.7334 20.4309 16.6093V16.1581H25.1959L25.1119 15.069C24.9914 13.5025 24.4342 12.2327 23.4565 11.294C22.6809 10.5499 21.6639 10.05 20.4309 9.80659V8H16.9845V9.77463C16.4936 9.86846 16.0298 10.002 15.6028 10.1725C14.8899 10.4577 14.2703 10.8433 13.7614 11.319C13.2365 11.8095 12.8305 12.402 12.5547 13.0797C12.2851 13.7422 12.1486 14.4794 12.1486 15.2706C12.1486 16.1512 12.3113 16.9289 12.6321 17.5816C12.9489 18.227 13.391 18.783 13.9454 19.2337C14.4682 19.6586 15.0788 20.0073 15.7594 20.2696C16.1486 20.42 16.5596 20.5539 16.9845 20.6691V22.5564C16.8862 22.3179 16.8222 22.0286 16.7932 21.6914L16.7133 20.7666H11.6528L11.7221 21.8434C11.7844 22.8113 11.9737 23.6713 12.2847 24.3995C12.6059 25.153 13.0464 25.7955 13.5938 26.3085C14.1396 26.8207 14.7989 27.2181 15.5528 27.4898C15.9958 27.6496 16.4764 27.7746 16.9841 27.8631V29.6565H20.4305V27.8713C20.9259 27.784 21.3992 27.6525 21.8401 27.4795C22.5805 27.189 23.2295 26.7821 23.7696 26.2704C24.317 25.7512 24.7456 25.1263 25.0435 24.413C25.3381 23.7066 25.4877 22.9129 25.4877 22.0549C25.4877 21.1968 25.3324 20.3798 25.0259 19.7258H25.0263Z"
                      fill="#FAA31B"
                    />
                    <path
                      d="M24.1104 20.1548C23.8662 19.6344 23.5207 19.1968 23.0741 18.8424C22.6271 18.4879 22.0932 18.1999 21.4712 17.9786C20.8496 17.7574 20.1653 17.5689 19.4196 17.4119V13.2808C20.405 13.4927 20.9393 14.1147 21.0221 15.146H24.1034C24.0018 13.8291 23.5531 12.7879 22.7562 12.0233C21.9592 11.2587 20.8471 10.8121 19.4196 10.683V9.01123H17.9965V10.6556C17.2503 10.7203 16.5779 10.8719 15.9793 11.1116C15.3802 11.3513 14.8717 11.6668 14.4526 12.0581C14.0334 12.4499 13.7134 12.917 13.4921 13.4607C13.2712 14.0044 13.1606 14.6076 13.1606 15.2706C13.1606 15.9983 13.2872 16.6203 13.5405 17.1358C13.7937 17.6516 14.1416 18.0893 14.5837 18.4482C15.0258 18.8075 15.5392 19.1001 16.1243 19.3255C16.7091 19.5512 17.3335 19.7332 17.9965 19.8713V24.3756C17.2872 24.2744 16.7574 24.0028 16.4075 23.5607C16.0571 23.1185 15.8502 22.5244 15.7859 21.7782H12.7324C12.7877 22.635 12.9488 23.3763 13.2159 24.0028C13.4831 24.6293 13.84 25.1521 14.2866 25.5709C14.7332 25.9901 15.2696 26.3125 15.8961 26.5379C16.5222 26.7637 17.2225 26.9087 17.9961 26.9731V28.6448H19.4191V26.9731C20.1653 26.9268 20.8492 26.7817 21.4708 26.5379C22.0924 26.2941 22.6267 25.9602 23.0737 25.5361C23.5203 25.1124 23.8658 24.608 24.11 24.0233C24.3538 23.4385 24.4763 22.7821 24.4763 22.0544C24.4763 21.3267 24.3542 20.6752 24.11 20.1544L24.1104 20.1548ZM17.9965 17.053C17.4806 16.9059 17.0684 16.6936 16.7599 16.4175C16.4513 16.1413 16.2968 15.7266 16.2968 15.1739C16.2968 14.0872 16.8635 13.4468 17.9965 13.2534V17.053ZM20.8565 23.6987C20.5525 24.0671 20.0735 24.2929 19.4196 24.3756V20.2445C20.1104 20.4289 20.5984 20.6707 20.884 20.9698C21.1692 21.2693 21.3122 21.677 21.3122 22.1925C21.3122 22.828 21.1602 23.3304 20.8561 23.6987H20.8565Z"
                      fill="#FFD981"
                    />
                    <path
                      d="M4.7501 9.49957C3.97204 11.1014 2.52537 14.6691 3.10143 19.1931C4.04654 26.6142 9.69113 30.7676 10.7684 31.5299C11.2081 30.9692 11.6478 30.4085 12.0875 29.8474C10.9469 29.0075 9.41846 27.7095 7.96565 25.8419C7.04895 24.6637 5.58231 21.7236 4.7501 18C3.86297 14.0306 4.96849 10.6921 5.5 9L4.7501 9.49957Z"
                      fill="#FFF4CF"
                    />
                    <path
                      d="M13.0962 30.4036C12.6657 30.9623 12.2352 31.5211 11.8047 32.0799C12.3089 32.4528 13.0144 32.8917 13.9207 33.2339C14.5206 33.4605 15.0736 33.5938 15.5421 33.6736C15.8352 32.9593 16.1286 32.2446 16.4216 31.5303C15.9077 31.384 15.3759 31.22 14.8278 31.0357C14.2203 30.8314 13.6431 30.6194 13.0966 30.4036H13.0962Z"
                      fill="#FFF4CF"
                    />
                  </svg>

                  {/* Animated glowing effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-400 opacity-0 animate-glow" />
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-full animate-shine" />

                {/* Animated particle */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping" />
              </div>

              {!isCollapsed && (
                <h1 className="ml-3 text-xl font-extrabold text-gray-800 dark:text-white overflow-hidden transition-all">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-400 inline-block animate-slideInRight">
                    Money
                  </span>
                  <span
                    className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-400 inline-block animate-slideInRight"
                    style={{ animationDelay: "200ms" }}
                  >
                    Matters
                  </span>
                </h1>
              )}
            </div>

            {/* Navigation */}
            <nav className={`mt-6 ${isCollapsed ? "px-2" : "px-4"}`}>
              <ul className="space-y-3">
                {navItems.map(
                  ({ name, path, icon, bgColor, borderColor, textColor }) => (
                    <li key={name}>
                      <NavLink
                        to={path}
                        end
                        className={({ isActive }) =>
                          `group flex items-center ${
                            isCollapsed
                              ? "justify-center"
                              : "justify-start gap-3"
                          } px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                            isActive
                              ? `bg-gradient-to-r ${bgColor} border-l-3 ${borderColor}`
                              : ""
                          }`
                        }
                        style={({ isActive }) => ({
                          boxShadow: isActive
                            ? `0 4px 12px -1px ${bgColor
                                .split(" ")[0]
                                .replace("from-", "")
                                .replace(
                                  "/20",
                                  "/10"
                                )}, 0 2px 4px -1px ${bgColor
                                .split(" ")[0]
                                .replace("from-", "")
                                .replace("/20", "/5")}`
                            : "",
                        })}
                        onMouseEnter={() => setIsHovering(name)}
                        onMouseLeave={() => setIsHovering(null)}
                      >
                        {({ isActive }) => (
                          <>
                            {/* Shine effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                            {icon(isActive, isHovering === name)}

                            {!isCollapsed && (
                              <span
                                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                                  isActive
                                    ? textColor + " font-semibold"
                                    : "text-gray-600 dark:text-gray-300"
                                }`}
                              >
                                {name}
                              </span>
                            )}

                            {/* Tooltip for collapsed state */}
                            {isCollapsed && (
                              <div className="absolute left-14 backdrop-blur-md bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100 dark:border-gray-700">
                                {name}
                              </div>
                            )}
                          </>
                        )}
                      </NavLink>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>

          {/* User Info */}
          {user && (
            <div
              className={`relative z-10 border-t border-gray-100 dark:border-gray-800 mt-6 pt-6 ${
                isCollapsed ? "px-2" : "px-6"
              } pb-6`}
            >
              <div
                className={`flex ${
                  isCollapsed ? "flex-col" : "items-center"
                } gap-3`}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}&backgroundColor=6366f1`}
                      alt="avatar"
                      className={`rounded-full transition-transform hover:scale-110 duration-300`}
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse ring-2 ring-white dark:ring-gray-900"></span>
                </div>

                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate animate-fadeIn">
                      {user.email.split("@")[0]}
                    </p>
                    <p
                      className="text-xs text-gray-500 dark:text-gray-400 truncate animate-fadeIn"
                      style={{ animationDelay: "200ms" }}
                    >
                      {user.email}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={logout}
                className={`mt-4 w-full flex items-center justify-center gap-2 text-sm text-white py-2 px-4 rounded-lg transition-all duration-300 bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 transform hover:scale-105 ${
                  isCollapsed ? "px-2" : "px-4"
                }`}
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                {!isCollapsed && <span>Sign Out</span>}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add decorative elements */}
      <div className="fixed bottom-0 left-0 w-64 h-32 bg-gradient-to-t from-indigo-500/20 to-transparent rounded-tr-full pointer-events-none z-30" />
      <div className="fixed top-0 left-0 w-32 h-64 bg-gradient-to-r from-purple-500/20 to-transparent rounded-br-full pointer-events-none z-30" />
    </>
  );
};

export default Sidebar;

/* Add these animation keyframes at the end */
const style = document.createElement("style");
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes float {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    10% {
      opacity: 0.8;
    }
    50% {
      transform: translateY(-40px) translateX(20px);
    }
    90% {
      opacity: 0.8;
    }
    100% {
      transform: translateY(-80px) translateX(0);
      opacity: 0;
    }
  }

  @keyframes shine {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(100%);
    }
  }

  @keyframes glow {
    0%, 100% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
  }

  .animate-slideInRight {
    animation: slideInRight 0.5s ease-out forwards;
  }

  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }

  .animate-float {
    animation: float 5s ease-in-out infinite;
  }

  .animate-shine {
    animation: shine 2s infinite;
  }

  .animate-glow {
    animation: glow 2s infinite;
  }
`;
document.head.appendChild(style);



// import { NavLink } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { HomeIcon, CreditCardIcon, UserIcon, LogOutIcon } from 'lucide-react'; // Optional: Use Lucide icons

// const Sidebar = () => {
//   const { user, logout } = useAuth();

//   const navItems = [
//     { name: 'Dashboard', path: '/', icon: <HomeIcon className="w-5 h-5" /> },
//     { name: 'Transactions', path: '/transactions', icon: <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M5.2085 22.9167C5.20915 23.469 5.42885 23.9986 5.81941 24.3891C6.20997 24.7797 6.7395 24.9994 7.29183 25H17.7085C18.2608 24.9994 18.7904 24.7797 19.1809 24.3891C19.5715 23.9986 19.7912 23.469 19.7918 22.9167V22.0052H5.2085V22.9167Z" fill="#5B73A0"/>
// <path d="M19.7918 2.08333C19.7912 1.531 19.5715 1.00148 19.1809 0.610917C18.7904 0.220358 18.2608 0.00065473 17.7085 0L7.29183 0C6.7395 0.00065473 6.20997 0.220358 5.81941 0.610917C5.42885 1.00148 5.20915 1.531 5.2085 2.08333V3.125H19.7918V2.08333Z" fill="#5B73A0"/>
// <path d="M24.7096 6.70052L21.5846 3.44531L20.0817 4.88802L21.3892 6.25H19.7915V8.33333H21.5015L20.1125 9.66459L21.5539 11.1688L24.6789 8.17396C24.7777 8.07926 24.8569 7.96602 24.9119 7.8407C24.9669 7.71538 24.9967 7.58045 24.9996 7.44361C25.0024 7.30677 24.9783 7.17071 24.9285 7.04321C24.8788 6.91571 24.8044 6.79926 24.7096 6.70052Z" fill="#5B73A0"/>
// <path d="M16.6668 6.24996H19.7918V4.16663H5.2085V16.6666H8.3335V18.75H5.2085V20.8333H19.7918V8.33329H16.6668V6.24996ZM15.6252 10.4166H11.9793C11.8412 10.4166 11.7087 10.4715 11.611 10.5692C11.5134 10.6669 11.4585 10.7993 11.4585 10.9375C11.4585 11.0756 11.5134 11.2081 11.611 11.3057C11.7087 11.4034 11.8412 11.4583 11.9793 11.4583H13.021C13.6668 11.4576 14.2898 11.697 14.7691 12.1298C15.2484 12.5627 15.5497 13.1582 15.6146 13.8007C15.6795 14.4433 15.5033 15.087 15.1203 15.607C14.7373 16.1269 14.1747 16.486 13.5418 16.6145V17.7083H11.4585V16.6666H9.37516V14.5833H13.021C13.1591 14.5833 13.2916 14.5284 13.3893 14.4307C13.487 14.3331 13.5418 14.2006 13.5418 14.0625C13.5418 13.9243 13.487 13.7919 13.3893 13.6942C13.2916 13.5965 13.1591 13.5416 13.021 13.5416H11.9793C11.3335 13.5423 10.7105 13.3029 10.2312 12.8701C9.75197 12.4372 9.45063 11.8417 9.38573 11.1992C9.32083 10.5566 9.49699 9.9129 9.88001 9.39294C10.263 8.87298 10.8256 8.51389 11.4585 8.38538V7.29163H13.5418V8.33329H15.6252V10.4166Z" fill="#5B73A0"/>
// <path d="M3.49828 16.6667L4.88734 15.3355L3.44593 13.8313L0.320931 16.8261C0.222115 16.9208 0.142929 17.034 0.0879011 17.1594C0.0328728 17.2847 0.00308028 17.4196 0.000226477 17.5564C-0.00262733 17.6933 0.0215135 17.8293 0.0712692 17.9568C0.121025 18.0843 0.19542 18.2008 0.290202 18.2995L3.4152 21.5547L4.91807 20.112L3.61064 18.75H5.2083V16.6667H3.49828Z" fill="#5B73A0"/>
// </svg>
// },
//     { name: 'Profile', path: '/profile', icon: <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
// <g clip-path="url(#clip0_1_1809)">
// <path d="M12.3218 12.0426C13.9762 12.0426 15.4088 11.4492 16.5794 10.2785C17.7499 9.10793 18.3433 7.67571 18.3433 6.02109C18.3433 4.36705 17.7499 2.93463 16.5792 1.76372C15.4085 0.593374 13.976 0 12.3218 0C10.6672 0 9.23494 0.593374 8.0644 1.76391C6.89386 2.93444 6.30029 4.36686 6.30029 6.02109C6.30029 7.67571 6.89386 9.10813 8.06459 10.2787C9.23532 11.449 10.6677 12.0426 12.3218 12.0426Z" fill="#5B73A0"/>
// <path d="M22.8579 19.2237C22.8241 18.7366 22.7558 18.2052 22.6553 17.644C22.5538 17.0787 22.4232 16.5443 22.2668 16.0558C22.1052 15.5509 21.8855 15.0523 21.6139 14.5745C21.332 14.0786 21.0009 13.6468 20.6293 13.2915C20.2408 12.9197 19.7651 12.6209 19.215 12.4028C18.6668 12.186 18.0593 12.0761 17.4095 12.0761C17.1543 12.0761 16.9075 12.1808 16.4309 12.4912C16.1375 12.6825 15.7944 12.9037 15.4114 13.1484C15.0839 13.3571 14.6402 13.5526 14.0923 13.7296C13.5576 13.9026 13.0148 13.9903 12.479 13.9903C11.9432 13.9903 11.4006 13.9026 10.8654 13.7296C10.318 13.5528 9.87434 13.3573 9.54723 13.1486C9.16786 12.9062 8.82454 12.6849 8.5268 12.491C8.05073 12.1806 7.80373 12.0759 7.54852 12.0759C6.8985 12.0759 6.2912 12.186 5.74322 12.403C5.19352 12.6207 4.71764 12.9195 4.32873 13.2917C3.95737 13.6472 3.62606 14.0788 3.34454 14.5745C3.07312 15.0523 2.85339 15.5507 2.69165 16.056C2.53544 16.5444 2.40479 17.0787 2.30331 17.644C2.2028 18.2044 2.13451 18.736 2.10075 19.2243C2.06757 19.7026 2.05078 20.1991 2.05078 20.7005C2.05078 22.0055 2.46563 23.062 3.28369 23.8412C4.09164 24.61 5.16071 25.0001 6.46076 25.0001H18.4984C19.7985 25.0001 20.8672 24.6102 21.6753 23.8412C22.4936 23.0626 22.9084 22.0059 22.9084 20.7003C22.9082 20.1966 22.8912 19.6998 22.8579 19.2237Z" fill="#5B73A0"/>
// </g>
// <defs>
// <clipPath id="clip0_1_1809">
// <rect width="25" height="25" fill="white"/>
// </clipPath>
// </defs>
// </svg>
//  },
//   ];

//   return (
//     <div className="w-64 bg-white h-screen fixed left-0 top-0 shadow-md p-6 flex flex-col justify-between">
//       {/* Logo */}
//       <div>
//         <div className="flex items-center gap-2 mb-12">
//           <svg width="44" height="38" viewBox="0 0 44 38" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M30.3509 11.1367C29.8451 6.71605 28.7706 2.94096 27.6895 0C25.8811 0.334497 23.7781 0.6087 21.419 0.71431C18.3655 0.850644 15.6396 0.670914 13.3691 0.384422C14.2593 1.84453 15.153 3.53699 15.9395 5.45487C16.2667 6.25252 16.5486 7.02482 16.7925 7.76601C16.4468 6.0605 16.1012 4.35499 15.7556 2.64948C16.9234 2.71054 18.1281 2.75125 19.3667 2.76737C21.7757 2.79887 24.0538 2.73435 26.1879 2.60301C26.7986 4.12034 27.3696 5.74251 27.8719 7.46608C29.8785 14.3523 30.1043 20.5253 29.7353 25.3922C30.4542 21.8844 31.0199 16.986 30.3509 11.1363V11.1367Z" fill="#60C7CA"/>
// <path d="M33.1462 4.17485C31.6719 3.87338 30.3727 3.47936 29.2678 3.07458C29.4479 3.69442 29.628 4.31387 29.8085 4.93371C30.6876 5.2444 31.6853 5.54625 32.7925 5.8001C33.8801 6.04972 34.8924 6.2114 35.8053 6.31509C35.4028 10.0349 34.5764 14.6268 32.8812 19.6961C31.5117 23.7907 29.8869 27.2659 28.3423 30.0889C31.2057 26.1572 34.672 20.2902 36.6494 12.5818C37.3756 9.75108 37.7908 7.10199 38.0116 4.71558C36.6275 4.68793 34.9765 4.54852 33.1462 4.17447V4.17485Z" fill="#00B4B7"/>
// <path d="M40.5364 11.8753C39.6792 11.3496 38.8781 10.82 38.1315 10.2961C37.9614 10.9164 37.7917 11.537 37.6215 12.1572C38.4453 12.8389 39.4027 13.5409 40.5034 14.2095C40.9327 14.4702 41.3548 14.7083 41.7657 14.9253C40.0168 18.3893 37.3888 22.7032 33.4678 27.0563C30.9969 29.7995 28.5241 31.9908 26.3013 33.7171C29.2564 31.9532 33.3875 29.023 37.3078 24.4176C40.6347 20.5092 42.712 16.6846 43.9996 13.802C42.899 13.2498 41.7369 12.6119 40.536 11.8757L40.5364 11.8753Z" fill="#02969C"/>
// <path d="M36.5278 26.2317C36.2609 26.4859 35.9878 26.734 35.7094 26.9756C32.379 32.7914 26.1562 35.3207 19 35C8.80457 34.543 2.04261 27.1958 2.5 17C2.82029 9.85728 5.857 3.82117 11.9298 1.0177C5.22257 3.76779 0.366034 10.2158 0.0196323 17.9338C-0.455422 28.529 7.74877 37.5036 18.344 37.9786C26.8861 38.3615 34.3745 33.1033 37.2048 25.4986C36.9982 25.7647 36.7724 25.999 36.5278 26.2317Z" fill="#F89A23"/>
// <path d="M25.0263 19.7258C24.7161 19.0645 24.2711 18.5011 23.7028 18.05C23.1701 17.6275 22.5333 17.2829 21.8101 17.026C21.3811 16.8736 20.9181 16.7334 20.4309 16.6093V16.1581H25.1959L25.1119 15.069C24.9914 13.5025 24.4342 12.2327 23.4565 11.294C22.6809 10.5499 21.6639 10.05 20.4309 9.80659V8H16.9845V9.77463C16.4936 9.86846 16.0298 10.002 15.6028 10.1725C14.8899 10.4577 14.2703 10.8433 13.7614 11.319C13.2365 11.8095 12.8305 12.402 12.5547 13.0797C12.2851 13.7422 12.1486 14.4794 12.1486 15.2706C12.1486 16.1512 12.3113 16.9289 12.6321 17.5816C12.9489 18.227 13.391 18.783 13.9454 19.2337C14.4682 19.6586 15.0788 20.0073 15.7594 20.2696C16.1486 20.42 16.5596 20.5539 16.9845 20.6691V22.5564C16.8862 22.3179 16.8222 22.0286 16.7932 21.6914L16.7133 20.7666H11.6528L11.7221 21.8434C11.7844 22.8113 11.9737 23.6713 12.2847 24.3995C12.6059 25.153 13.0464 25.7955 13.5938 26.3085C14.1396 26.8207 14.7989 27.2181 15.5528 27.4898C15.9958 27.6496 16.4764 27.7746 16.9841 27.8631V29.6565H20.4305V27.8713C20.9259 27.784 21.3992 27.6525 21.8401 27.4795C22.5805 27.189 23.2295 26.7821 23.7696 26.2704C24.317 25.7512 24.7456 25.1263 25.0435 24.413C25.3381 23.7066 25.4877 22.9129 25.4877 22.0549C25.4877 21.1968 25.3324 20.3798 25.0259 19.7258H25.0263Z" fill="#FAA31B"/>
// <path d="M24.1104 20.1548C23.8662 19.6344 23.5207 19.1968 23.0741 18.8424C22.6271 18.4879 22.0932 18.1999 21.4712 17.9786C20.8496 17.7574 20.1653 17.5689 19.4196 17.4119V13.2808C20.405 13.4927 20.9393 14.1147 21.0221 15.146H24.1034C24.0018 13.8291 23.5531 12.7879 22.7562 12.0233C21.9592 11.2587 20.8471 10.8121 19.4196 10.683V9.01123H17.9965V10.6556C17.2503 10.7203 16.5779 10.8719 15.9793 11.1116C15.3802 11.3513 14.8717 11.6668 14.4526 12.0581C14.0334 12.4499 13.7134 12.917 13.4921 13.4607C13.2712 14.0044 13.1606 14.6076 13.1606 15.2706C13.1606 15.9983 13.2872 16.6203 13.5405 17.1358C13.7937 17.6516 14.1416 18.0893 14.5837 18.4482C15.0258 18.8075 15.5392 19.1001 16.1243 19.3255C16.7091 19.5512 17.3335 19.7332 17.9965 19.8713V24.3756C17.2872 24.2744 16.7574 24.0028 16.4075 23.5607C16.0571 23.1185 15.8502 22.5244 15.7859 21.7782H12.7324C12.7877 22.635 12.9488 23.3763 13.2159 24.0028C13.4831 24.6293 13.84 25.1521 14.2866 25.5709C14.7332 25.9901 15.2696 26.3125 15.8961 26.5379C16.5222 26.7637 17.2225 26.9087 17.9961 26.9731V28.6448H19.4191V26.9731C20.1653 26.9268 20.8492 26.7817 21.4708 26.5379C22.0924 26.2941 22.6267 25.9602 23.0737 25.5361C23.5203 25.1124 23.8658 24.608 24.11 24.0233C24.3538 23.4385 24.4763 22.7821 24.4763 22.0544C24.4763 21.3267 24.3542 20.6752 24.11 20.1544L24.1104 20.1548ZM17.9965 17.053C17.4806 16.9059 17.0684 16.6936 16.7599 16.4175C16.4513 16.1413 16.2968 15.7266 16.2968 15.1739C16.2968 14.0872 16.8635 13.4468 17.9965 13.2534V17.053ZM20.8565 23.6987C20.5525 24.0671 20.0735 24.2929 19.4196 24.3756V20.2445C20.1104 20.4289 20.5984 20.6707 20.884 20.9698C21.1692 21.2693 21.3122 21.677 21.3122 22.1925C21.3122 22.828 21.1602 23.3304 20.8561 23.6987H20.8565Z" fill="#FFD981"/>
// <path d="M4.7501 9.49957C3.97204 11.1014 2.52537 14.6691 3.10143 19.1931C4.04654 26.6142 9.69113 30.7676 10.7684 31.5299C11.2081 30.9692 11.6478 30.4085 12.0875 29.8474C10.9469 29.0075 9.41846 27.7095 7.96565 25.8419C7.04895 24.6637 5.58231 21.7236 4.7501 18C3.86297 14.0306 4.96849 10.6921 5.5 9L4.7501 9.49957Z" fill="#FFF4CF"/>
// <path d="M13.0962 30.4036C12.6657 30.9623 12.2352 31.5211 11.8047 32.0799C12.3089 32.4528 13.0144 32.8917 13.9207 33.2339C14.5206 33.4605 15.0736 33.5938 15.5421 33.6736C15.8352 32.9593 16.1286 32.2446 16.4216 31.5303C15.9077 31.384 15.3759 31.22 14.8278 31.0357C14.2203 30.8314 13.6431 30.6194 13.0966 30.4036H13.0962Z" fill="#FFF4CF"/>
// </svg>


//           <h1 className="text-xl font-extrabold text-gray-800">
//             <span className="text-orange-500">Money</span>
//             <span className="text-emerald-600"> Matters</span>
//           </h1>
//         </div>

//         {/* Navigation */}
//         <nav>
//           <ul className="space-y-2">
//             {navItems.map(({ name, path, icon }) => (
//               <li key={name}>
//                 <NavLink
//                   to={path}
//                   end
//                   className={({ isActive }) =>
//                     `flex items-center gap-3 px-4 py-2 rounded-md font-medium text-sm transition-all ${
//                       isActive
//                         ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
//                         : 'text-gray-600 hover:bg-gray-100'
//                     }`
//                   }
//                 >
//                   {icon}
//                   {name}
//                 </NavLink>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>

//       {/* User Info */}
//       {user && (
//         <div className="border-t pt-4">
//           <div className="flex items-center gap-3">
//             <img
//               src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`}
//               alt="avatar"
//               className="w-10 h-10 rounded-full"
//             />
//             <div>
//               <p className="text-sm font-medium text-gray-900">{user.email.split('@')[0]}</p>
//               <p className="text-xs text-gray-500">{user.email}</p>
//               <button
//             onClick={logout}
//             className="mt-3 flex items-center gap-2 text-sm text-red-500 hover:text-red-700"
//           >
//             <LogOutIcon className="w-4 h-4" />
//           </button>
//             </div>
//           </div>
          
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;
