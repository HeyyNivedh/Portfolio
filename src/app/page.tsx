"use client";
import React from "react";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { PROFILE, PROJECTS, CERTIFICATES } from "@/constants";
import { Github, Linkedin, ExternalLink, Award, Code, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-black antialiased selection:bg-indigo-500 selection:text-white">
      {/* HERO SECTION */}
      <HeroHighlight>
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
        >
          Hi, I&apos;m {PROFILE.name}. <br />
          <Highlight className="text-black dark:text-white">
            {PROFILE.title}
          </Highlight>
          <div className="mt-4 text-base md:text-lg font-normal text-neutral-400 max-w-lg mx-auto">
            {PROFILE.bio}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <a href={PROFILE.socials.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-neutral-800 rounded-full hover:bg-neutral-700 transition">
              <Github className="w-6 h-6 text-white" />
            </a>
            <a href={PROFILE.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-900/30 rounded-full hover:bg-blue-900/50 transition">
              <Linkedin className="w-6 h-6 text-blue-400" />
            </a>
          </div>
        </motion.h1>
      </HeroHighlight>

      <div className="max-w-7xl mx-auto px-4 py-20">

        {/* PROJECTS SECTION */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Featured Projects
          </h2>
          <BentoGrid>
            {PROJECTS.map((project, i) => (
              <BentoGridItem
                key={project.id}
                title={project.title}
                description={
                  <div>
                    <span className="text-sm text-neutral-400 block mb-2">{project.description}</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-[10px] rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                }
                header={
                  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-800 p-4 relative overflow-hidden group-hover/bento:border-indigo-500/50 transition-colors">
                    <div className="absolute right-2 top-2">
                      <Code className="w-5 h-5 text-neutral-600 group-hover/bento:text-indigo-400 transition" />
                    </div>
                  </div>
                }
                className={i === 0 || i === 3 ? "md:col-span-2" : ""}
                icon={<ExternalLink className="h-4 w-4 text-neutral-500" />}
              />
            ))}
          </BentoGrid>
        </section>

        {/* CERTIFICATES SECTION */}
        <section>
          <h2 className="text-3xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Certifications & Awards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFICATES.map((cert) => (
              <div key={cert.id} className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition flex flex-col items-center text-center group">
                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mb-4 group-hover:scale-110 transition duration-200">
                  <Award className="w-6 h-6 text-yellow-500" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{cert.title}</h3>
                <p className="text-sm text-neutral-400">{cert.issuer}</p>
                <span className="text-xs text-neutral-500 mt-2">{cert.date}</span>
              </div>
            ))}

            {/* Fallback / Add New */}
            <div className="p-6 rounded-2xl border border-dashed border-neutral-800 flex flex-col items-center justify-center text-neutral-600 hover:text-neutral-400 hover:border-neutral-700 transition cursor-pointer">
              <GraduationCap className="w-8 h-8 mb-2 opacity-50" />
              <span className="text-sm">More coming soon...</span>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}