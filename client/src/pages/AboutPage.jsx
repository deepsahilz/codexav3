import React, { useState, useEffect } from 'react';

const AboutPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`font-sans text-gray-900 bg-white overflow-hidden ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
      {/* Cursor Follow Element */}
      <div id="cursor-follow" className="fixed w-8 h-8 rounded-full bg-black bg-opacity-20 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference z-50 hidden md:block"></div>
      
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center bg-black text-white relative">
        <div className="absolute inset-0 opacity-50">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-black to-black"></div>
        </div>
        <div className="relative z-10 px-6 text-center max-w-6xl mx-auto">
          <h1 className="text-8xl md:text-9xl font-black font-neue  mb-2 transform transition-transform duration-700 translate-y-0">
            Code<span className="text-gray-400">xa</span>
          </h1>
          <p className="text-xl md:text-2xl  mt-6 md:mt-8">Where Code Meets Community</p>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <span className="block text-sm font-semibold mb-2 text-gray-400">01</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Our Purpose</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-700">
                At the heart of Codexa is a simple yet powerful idea: creating a community where learning 
                happens through real implementations, where inspiration flows freely, and where connections 
                form naturally around shared technical interests. We believe that seeing how others solve 
                problems is one of the most effective ways to grow as a developer, and that the best 
                innovations happen when ideas are shared and refined collectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve Section */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-4">
              <span className="block text-sm font-semibold mb-2 text-gray-400">02</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">The Problems We Solve</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-700">
                We've identified key challenges in the developer community and built solutions that bridge gaps, 
                foster connections, and accelerate learning.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-t border-gray-200 pt-8 group hover:bg-white transition-all duration-500 p-6">
              <h3 className="text-2xl font-bold mb-4 group-hover:translate-x-2 transition-transform duration-300">Project Showcase Deficit</h3>
              <p className="text-lg text-gray-600 group-hover:translate-x-2 transition-transform duration-500">
                Traditional social platforms aren't optimized for code sharing, while code repositories lack social engagement features.
              </p>
            </div>
            <div className="border-t border-gray-200 pt-8 group hover:bg-white transition-all duration-500 p-6">
              <h3 className="text-2xl font-bold mb-4 group-hover:translate-x-2 transition-transform duration-300">Inspiration Bottlenecks</h3>
              <p className="text-lg text-gray-600 group-hover:translate-x-2 transition-transform duration-500">
                Finding fresh approaches and creative solutions often requires browsing countless repositories without context.
              </p>
            </div>
            <div className="border-t border-gray-200 pt-8 group hover:bg-white transition-all duration-500 p-6">
              <h3 className="text-2xl font-bold mb-4 group-hover:translate-x-2 transition-transform duration-300">Connection Challenges</h3>
              <p className="text-lg text-gray-600 group-hover:translate-x-2 transition-transform duration-500">
                Identifying peers with complementary skills or similar interests is difficult without a project-focused community.
              </p>
            </div>
            <div className="border-t border-gray-200 pt-8 group hover:bg-white transition-all duration-500 p-6">
              <h3 className="text-2xl font-bold mb-4 group-hover:translate-x-2 transition-transform duration-300">Theory-Practice Divide</h3>
              <p className="text-lg text-gray-600 group-hover:translate-x-2 transition-transform duration-500">
                Bridging the gap between theoretical knowledge and practical implementation remains a significant hurdle for many.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-4">
              <span className="block text-sm font-semibold mb-2 text-gray-400">03</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Key Features</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-700">
                Our platform empowers developers to share their work, connect with peers, and grow their skills 
                through real-world implementations.
              </p>
            </div>
          </div>
          
          <div className="space-y-32 mt-16">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4">
                <span className="text-6xl font-black text-gray-100">01</span>
                <h3 className="text-3xl font-bold mt-4">Share & Discover</h3>
              </div>
              <div className="md:col-span-8 space-y-6">
                <div className="flex items-start group">
                  <div className="w-8 h-px bg-black group-hover:w-16 transition-all duration-300 mt-3 mr-4"></div>
                  <div>
                    <h4 className="text-xl font-semibold">Project Showcasing</h4>
                    <p className="text-gray-600 mt-2">Upload and present your coding projects with rich descriptions, images, and code snippets.</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="w-8 h-px bg-black group-hover:w-16 transition-all duration-300 mt-3 mr-4"></div>
                  <div>
                    <h4 className="text-xl font-semibold">Exploration Feed</h4>
                    <p className="text-gray-600 mt-2">Browse projects filtered by technologies, categories, trending status, or personalized recommendations.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4">
                <span className="text-6xl font-black text-gray-100">02</span>
                <h3 className="text-3xl font-bold mt-4">Engage & Connect</h3>
              </div>
              <div className="md:col-span-8 space-y-6">
                <div className="flex items-start group">
                  <div className="w-8 h-px bg-black group-hover:w-16 transition-all duration-300 mt-3 mr-4"></div>
                  <div>
                    <h4 className="text-xl font-semibold">Interactive Feedback</h4>
                    <p className="text-gray-600 mt-2">Like, comment, and provide constructive feedback on projects.</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="w-8 h-px bg-black group-hover:w-16 transition-all duration-300 mt-3 mr-4"></div>
                  <div>
                    <h4 className="text-xl font-semibold">Developer Network</h4>
                    <p className="text-gray-600 mt-2">Follow other developers whose work inspires you and build your professional network.</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="w-8 h-px bg-black group-hover:w-16 transition-all duration-300 mt-3 mr-4"></div>
                  <div>
                    <h4 className="text-xl font-semibold">Real-time Communication</h4>
                    <p className="text-gray-600 mt-2">Receive notifications about interactions with your projects and exchange messages with other community members.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4">
                <span className="text-6xl font-black text-gray-100">03</span>
                <h3 className="text-3xl font-bold mt-4">Grow & Learn</h3>
              </div>
              <div className="md:col-span-8 space-y-6">
                <div className="flex items-start group">
                  <div className="w-8 h-px bg-black group-hover:w-16 transition-all duration-300 mt-3 mr-4"></div>
                  <div>
                    <h4 className="text-xl font-semibold">Personalized Experience</h4>
                    <p className="text-gray-600 mt-2">Customize your feed based on technologies and topics that interest you most.</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="w-8 h-px bg-black group-hover:w-16 transition-all duration-300 mt-3 mr-4"></div>
                  <div>
                    <h4 className="text-xl font-semibold">Skill Development</h4>
                    <p className="text-gray-600 mt-2">Learn from real-world implementations and diverse approaches to similar problems.</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="w-8 h-px bg-black group-hover:w-16 transition-all duration-300 mt-3 mr-4"></div>
                  <div>
                    <h4 className="text-xl font-semibold">Collaboration Opportunities</h4>
                    <p className="text-gray-600 mt-2">Find potential collaborators for your next big idea.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 md:py-40 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-4">
              <span className="block text-sm font-semibold mb-2 text-gray-400">04</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Our Mission</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-300">
                These three words capture the essence of what Codexa stands for. We're building more than just a platform—we're fostering 
                an ecosystem where developers at all levels can grow by building meaningful projects, expressing their unique approaches 
                to problem-solving, and inspiring others through their work.
              </p>
            </div>
          </div>
          
          <div className="flex justify-center my-16">
            <div className="text-center">
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter">
                <span className="block">CREATE.</span>
                <span className="block mt-2">EXPRESS.</span>
                <span className="block mt-2">INSPIRE.</span>
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Future Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <span className="block text-sm font-semibold mb-2 text-gray-400">05</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">The Future of Codexa</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-700 mb-12">
                We envision Codexa evolving into a global hub for digital innovation—a place where the next generation of breakthrough 
                ideas take shape through collaboration and community support. By connecting developers across geographical and experiential 
                boundaries, we aim to accelerate learning, spark innovation, and create opportunities for everyone passionate about code.
              </p>
              <p className="text-2xl font-bold">Join us in building this community, one project at a time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-8">Ready to dive in?</h2>
            <p className="text-xl md:text-2xl font-light mb-10">Start sharing your projects and connecting with developers today.</p>
            <button className="bg-white text-black font-bold text-lg py-4 px-12 rounded-full hover:scale-105 transition duration-300">
              Join Codexa
            </button>
          </div>
        </div>
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-black to-black"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Codexa</h3>
              <p className="mb-4">Where Code Meets Community</p>
              <p>© {new Date().getFullYear()} All rights reserved.</p>
            </div>
            <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-8">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Cursor Follow Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const cursor = document.getElementById('cursor-follow');
            
            document.addEventListener('mousemove', function(e) {
              cursor.style.left = e.clientX + 'px';
              cursor.style.top = e.clientY + 'px';
            });
            
            const links = document.querySelectorAll('a, button');
            links.forEach(link => {
              link.addEventListener('mouseenter', () => {
                cursor.classList.add('scale-150');
              });
              link.addEventListener('mouseleave', () => {
                cursor.classList.remove('scale-150');
              });
            });
          });
        `
      }} />
    </div>
  );
};

export default AboutPage;