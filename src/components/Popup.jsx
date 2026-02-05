import React from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Linkedin, Github, Phone, MapPin, Award, BookOpen, Briefcase, Code, Quote, Terminal } from 'lucide-react';

const PROFILE_IMG = "/anshu.jpg"; 

export default function Popup({ section, onClose }) {
  if (!section) return null;

  const getContent = () => {
    switch(section) {
        // --- YELLOW: INTRO ---
        case 'intro': return (
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative group cursor-pointer mt-2">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-75 group-hover:opacity-100 transition duration-500 blur-md"></div>
                <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-white shadow-2xl overflow-hidden transition-transform duration-500 transform group-hover:scale-105">
                    <img src={PROFILE_IMG} alt="Anshu Manoj Mahto" className="w-full h-full object-cover object-top" />
                </div>
            </div>
            
            <div className="animate-fade-in-up">
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-wide">ANSHU MANOJ MAHTO</h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                    <Terminal size={16} className="text-yellow-600" />
                    <p className="text-sm md:text-base text-yellow-600 font-bold">Backend & System Design Engineer</p>
                </div>
            </div>

            <div className="bg-yellow-50/80 p-5 rounded-xl border border-yellow-100 text-sm md:text-base text-gray-700 leading-relaxed shadow-sm text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-200 rounded-bl-full opacity-20"></div>
                <p>
                    I am a final-year <strong>Computer Science</strong> student at <strong>NIT Patna</strong> with a core passion for <strong>Java</strong> and <strong>Backend System Design</strong>. 
                    <br/><br/>
                    While I am proficient in the MERN stack, my true strength lies in architecting scalable, efficient systems using <strong>Spring Boot</strong> and <strong>Microservices</strong>.
                </p>
            </div>

            <div className="relative italic text-gray-500 text-sm md:text-base mt-2 px-8 py-2 border-l-4 border-yellow-400 bg-gray-50 rounded-r-lg w-full text-left">
                <Quote size={20} className="absolute -top-3 -left-3 text-yellow-400 fill-current" />
                "Simplicity is the prerequisite for reliability."
                <span className="block text-right text-xs font-bold text-gray-400 mt-2 not-italic">— Edsger W. Dijkstra</span>
            </div>

            <div className="w-full pt-4">
                 <h3 className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Let's Connect</h3>
                 <div className="flex justify-center gap-4">
                    <SocialButton icon={<Linkedin size={18}/>} label="LinkedIn" href="https://www.linkedin.com/in/anshu-manoj-mahto-0abb342b7/" />
                    <SocialButton icon={<Github size={18}/>} label="GitHub" href="https://github.com/Anshumanojmahto" />
                    <SocialButton icon={<Mail size={18}/>} label="Email" href="mailto:anshumahtoworks@gmail.com" />
                 </div>
            </div>
          </div>
        );

        // --- BLUE: SKILLS ---
        case 'skills': return (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                 <Code className="text-blue-600" size={24} />
                 <h2 className="text-2xl font-black text-slate-800">SKILLS</h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <SkillSection title="Core Languages" skills={["Java (Priority)", "C++", "SQL", "Python", "JavaScript"]} />
                <SkillSection title="Backend Engineering" skills={["Spring Boot", "Microservices", "System Design", "Node.js", "Express.js"]} />
                <SkillSection title="Databases" skills={["MySQL", "PostgreSQL", "MongoDB", "Redis", "Supabase"]} />
                <SkillSection title="Frontend & Mobile" skills={["React.js", "React Native", "Redux", "Tailwind CSS"]} />
                <SkillSection title="DevOps & Tools" skills={["Docker", "Git/GitHub", "CI/CD", "Linux", "Postman"]} />
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                     <Award className="text-orange-500" size={24} />
                     <h2 className="text-xl font-black text-slate-800">ACHIEVEMENTS</h2>
                  </div>
                  <ul className="space-y-3">
                      <AchievementItem title="Competitive Programming" desc="Solved 1000+ problems on LeetCode/Codeforces. Consistent Top 10% rank." />
                      <AchievementItem title="Byteverse Hackathon Finalist (2024)" desc="Secured Top 5 position building 'College Buddies' full-stack app." />
                      <AchievementItem title="Smart India Hackathon (2023)" desc="Selected in Internal Rounds for Indian Railway solution design." />
                  </ul>
              </div>
            </div>
        );

        // --- RED: PROJECTS ---
        case 'projects': return (
            <div>
               <div className="flex items-center gap-2 mb-6">
                 <Briefcase className="text-red-600" size={24} />
                 <h2 className="text-2xl font-black text-slate-800">PROJECTS</h2>
              </div>
              
              <div className="space-y-5">
                <ProjectCard 
                  title="Makeeasy App (Startup Idea)" 
                  date="Nov 2024"
                  stack="React Native, Supabase"
                  link="https://github.com/Anshumanojmahto/Makeeasyapp"
                  points={[
                      "Real-time food ordering app serving 20+ students.",
                      "Reduced delivery time to <20 mins via live tracking.",
                      "Optimized backend APIs improving efficiency by 30%."
                  ]}
                />
                <ProjectCard 
                  title="Multi-Disease Detection" 
                  date="Jan 2025"
                  stack="Python (Flask), Scikit-learn, Streamlit"
                  link="https://github.com/Anshumanojmahto/diseasePridictionSystem"
                  points={[
                      "ML-powered app predicting Diabetes, Heart Disease & Parkinson’s.",
                      "Achieved 85%+ accuracy with real-time risk prediction.",
                      "Deployed on Streamlit Cloud for 24/7 accessibility."
                  ]}
                />
                <ProjectCard 
                  title="Blog App" 
                  date="Aug 2024"
                  stack="React.js, Appwrite, Tailwind CSS"
                  link="https://github.com/Anshumanojmahto/Blog-app"
                  points={[
                      "Secure blogging platform with Auth & CRUD features.",
                      "Seamless experience using react-hook-form & TinyMCE.",
                      "Responsive mobile-first UI improving accessibility by 40%."
                  ]}
                />
              </div>
            </div>
        );

        // --- GREEN: EXPERIENCE ---
        case 'experience': return (
            <div>
              <div className="flex items-center gap-2 mb-6">
                 <BookOpen className="text-green-600" size={24} />
                 <h2 className="text-2xl font-black text-slate-800">EXPERIENCE</h2>
              </div>

              {/* Work Experience Timeline */}
              <div className="border-l-4 border-green-500 pl-4 space-y-8 mb-10">
                
                {/* 1. NPTEL IIT ROPAR INTERNSHIP (UPDATED) */}
                <div className="relative group">
                    <span className="absolute -left-[25px] top-1 h-4 w-4 rounded-full border-4 border-white bg-green-600 shadow-md"></span>
                    <h3 className="text-lg font-bold text-slate-800">NPTEL Winter Intern</h3>
                    <p className="text-sm font-bold text-green-700">IIT Ropar (Virtual) | Jan 2026 – Mar 2026</p>
                    <p className="text-xs text-slate-500 font-semibold mb-2 italic">Mentored by Prof. Sudarshan Iyengar</p>
                    <ul className="list-disc ml-4 text-xs md:text-sm text-gray-600 space-y-1">
                        <li><strong>Collaborated with 500+ people</strong> in a large-scale technical initiative.</li>
                        <li>Developed and deployed <strong>Real-World Projects</strong> using the <strong>MERN Stack</strong>.</li>
                        <li>Selected for the prestigious NPTEL Winter Internship 2025 (Stipend: ₹10,000).</li>
                    </ul>
                </div>

                {/* 2. HACKSLASH CLUB */}
                <div className="relative group">
                    <span className="absolute -left-[25px] top-1 h-4 w-4 rounded-full border-4 border-white bg-green-400 shadow-md"></span>
                    <h3 className="text-lg font-bold text-slate-800">HackSlash Club, NITP</h3>
                    <p className="text-sm font-semibold text-green-700">Member & Developer | May 2024 – Present</p>
                    <ul className="list-disc ml-4 mt-2 text-xs md:text-sm text-gray-600 space-y-1">
                        <li>Built scalable web solutions using React.js, Node.js & Express.</li>
                        <li>Reduced API latency by 25% through optimization.</li>
                        <li>Collaborated in Agile team using Git/GitHub CI/CD pipelines.</li>
                    </ul>
                </div>

              </div>

              <div className="flex items-center gap-2 mb-6">
                 <BookOpen className="text-green-600" size={24} />
                 <h2 className="text-2xl font-black text-slate-800">EDUCATION</h2>
              </div>

              <div className="space-y-4">
                  <EduCard inst="National Institute of Technology, Patna" degree="B.Tech in CSE" year="2023 – Present" score="CGPA: 9.10" />
                  <EduCard inst="Junior Nirda College" degree="Senior Secondary (Maharashtra Board)" year="2021 – 2023" score="7.8" />
                  <EduCard inst="Podar International School" degree="Secondary (CBSE)" year="2021" score="9.6" />
              </div>
            </div>
        );

        // --- CENTER: CONTACT REDIRECT ---
        case 'contact': return (
            <div className="text-center py-10 flex flex-col items-center justify-center h-full">
              <h2 className="text-4xl font-black text-slate-800 mb-2">GET IN TOUCH</h2>
              <p className="text-gray-500 mb-8">Open for internships and full-time roles.</p>
              
              <div className="space-y-3 w-full max-w-xs">
                 <a href="mailto:anshumahtoworks@gmail.com" className="flex items-center justify-center gap-3 w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:scale-105 transition shadow-lg">
                    <Mail size={18}/> Send Email
                 </a>
                 <a href="tel:+919699872271" className="flex items-center justify-center gap-3 w-full py-3 bg-white border-2 border-slate-200 text-slate-800 rounded-xl font-bold hover:bg-slate-50 transition">
                    <Phone size={18}/> Call Me
                 </a>
                 <div className="flex gap-3 pt-2">
                     <a href="https://www.linkedin.com/in/anshu-manoj-mahto-0abb342b7/" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
                        <Linkedin size={18}/> LinkedIn
                     </a>
                     <a href="https://github.com/Anshumanojmahto" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-black transition">
                        <Github size={18}/> GitHub
                     </a>
                 </div>
              </div>
            </div>
        );
        default: return null;
      }
  };

  return (
    // UPDATED Z-INDEX TO 200 (Highest) AND REMOVED 'top-16' TO COVER NAVBAR
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-6 md:p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-white shadow-2xl overflow-hidden flex flex-col w-full max-w-lg max-h-[85vh] rounded-2xl aspect-[1/1.414]"
      >
        <div className="h-8 bg-slate-100 border-b border-slate-200 shrink-0 flex items-center px-4">
            <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto opacity-50"></div> 
        </div>
        
        <button onClick={onClose} className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full hover:bg-red-100 hover:text-red-500 transition z-20">
          <X size={18} />
        </button>

        <div className="p-6 md:p-8 overflow-y-auto font-sans h-full">
          {getContent()}
        </div>
      </motion.div>
    </div>
  );
}

// --- Helper Components ---
const SocialButton = ({ icon, label, href }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200 transition transform hover:scale-105 border border-slate-200">
        {icon} {label}
    </a>
);
const SkillSection = ({ title, skills }) => (
    <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 hover:border-blue-300 transition">
        <h3 className="text-xs font-bold text-blue-800 uppercase mb-2">{title}</h3>
        <div className="flex flex-wrap gap-2">
            {skills.map(s => (
                <span key={s} className="px-2 py-1 bg-white border border-blue-200 text-blue-900 text-[10px] md:text-xs font-semibold rounded shadow-sm">
                    {s}
                </span>
            ))}
        </div>
    </div>
);
const AchievementItem = ({ title, desc }) => (
    <li className="bg-orange-50 p-3 rounded-lg border border-orange-100 text-sm text-gray-700 hover:shadow-sm transition">
        <strong className="block text-orange-800 font-bold mb-1">{title}</strong>
        {desc}
    </li>
);
const ProjectCard = ({ title, date, stack, points, link }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition relative group">
        <div className="flex justify-between items-start mb-2 pr-8">
            <h3 className="font-bold text-slate-800 leading-tight">{title}</h3>
            <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded whitespace-nowrap">{date}</span>
        </div>
        {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="absolute top-4 right-4 text-gray-400 hover:text-black transition" title="View Code">
                <Github size={18} />
            </a>
        )}
        <p className="text-xs font-mono text-red-600 mb-3 bg-red-50 inline-block px-2 py-0.5 rounded">{stack}</p>
        <ul className="list-disc ml-4 space-y-1">
            {points.map((p, i) => (
                <li key={i} className="text-xs md:text-sm text-gray-600 leading-relaxed">{p}</li>
            ))}
        </ul>
    </div>
);
const EduCard = ({ inst, degree, year, score }) => (
    <div className="flex justify-between items-start border-b border-gray-100 pb-3 last:border-0 hover:bg-gray-50 p-2 rounded transition">
        <div>
            <h4 className="font-bold text-sm text-slate-800">{inst}</h4>
            <p className="text-xs text-gray-600">{degree}</p>
        </div>
        <div className="text-right">
             <span className="block text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded mb-1">{year}</span>
             <span className="block text-xs font-bold text-slate-500">{score}</span>
        </div>
    </div>
);