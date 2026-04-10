import { Navigation } from "@/components/newspaper/navigation"
import { HeroSection } from "@/components/newspaper/hero-section"
import { NewsTicker } from "@/components/newspaper/news-ticker"
import { AboutSection } from "@/components/newspaper/about-section"
import { SkillsSection } from "@/components/newspaper/skills-section"
import { ProjectsSection } from "@/components/newspaper/projects-section"
import { GithubActivity } from "@/components/newspaper/github-activity"
import { ExperienceSection } from "@/components/newspaper/experience-section"
import { BooksSection } from "@/components/newspaper/books-section"
import { ArticlesSection } from "@/components/newspaper/articles-section"
import { ContactSection } from "@/components/newspaper/contact-section"
import { DownloadSection } from "@/components/newspaper/download-section"
import { Footer } from "@/components/newspaper/footer"
import { CustomCursor } from "@/components/newspaper/custom-cursor"
export default function Home() {
  return (
    <main>
      <CustomCursor />
      <Navigation />
      <HeroSection />
      <NewsTicker />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <GithubActivity />
      <ExperienceSection />
      <BooksSection />
      <ArticlesSection />
      <ContactSection />
      <DownloadSection />
      <Footer />
    </main>
  )
}
