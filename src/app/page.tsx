"use client";
import { motion } from "framer-motion";
import { PROFILE, PROJECTS, CERTIFICATES } from "@/constants";
import { Github, Linkedin, ExternalLink, Award } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-24 selection:bg-purple-500 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* HERO SECTION */}
        <section className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
          >
            {PROFILE.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            {PROFILE.title}
          </motion.p>
          <p className="max-w-lg text-gray-500">{PROFILE.bio}</p>

          <div className="flex gap-4">
            <a href={PROFILE.socials.github} className="p-2 bg-gray-900 rounded-full hover:bg-gray-800 transition"><Github size={20} /></a>
            <a href={PROFILE.socials.linkedin} className="p-2 bg-gray-900 rounded-full hover:bg-blue-900 transition"><Linkedin size={20} /></a>
          </div>
        </section>

        {/* PROJECTS GRID */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-purple-500">#</span> Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-purple-500/50 transition-all hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)]"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">{project.title}</h3>
                  <ExternalLink size={18} className="text-gray-500 group-hover:text-white" />
                </div>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CERTIFICATES SECTION (Bento Style) */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Award className="text-pink-500" /> Certificates
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CERTIFICATES.map((cert) => (
              <div key={cert.id} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 transition text-center flex flex-col items-center justify-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                  {cert.issuer[0]}
                </div>
                <div className="text-sm font-medium">{cert.title}</div>
                <div className="text-xs text-gray-500">{cert.issuer}</div>
              </div>
            ))}
            {/* The "Add New" Placeholder */}
            <div className="p-4 rounded-xl border border-dashed border-zinc-800 flex items-center justify-center text-zinc-600 text-sm">
              + Add More
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}