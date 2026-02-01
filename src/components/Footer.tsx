import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SOCIAL_MEDIA_CONFIG, getInstagramLinks } from "../config/socialMedia";

type FooterVariant = "full" | "compact";

type FooterProps = {
  variant?: FooterVariant;
  /** Delay (ms) before showing the contact button – e.g. on gallery detail page */
  contactButtonDelay?: number;
};

export const Footer = ({ variant = "full", contactButtonDelay = 0 }: FooterProps) => {
  const { t } = useTranslation();
  const instagramLinks = getInstagramLinks("both");

  const emailLink = (
    <a
      href={`mailto:${t("contact.email")}`}
      className="inline-flex items-center gap-2 text-white hover:text-skyblue transition-colors"
    >
      <Mail size={variant === "compact" ? 18 : 28} />
      <span className={variant === "compact" ? "text-sm" : "text-xl font-semibold"}>
        {t("contact.email")}
      </span>
    </a>
  );

  const socialLinks = (
    <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
      <a
        href={SOCIAL_MEDIA_CONFIG.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
        aria-label={t("contact.social.github")}
      >
        <Github size={variant === "compact" ? 18 : 24} />
        {variant === "full" && <span>{t("contact.social.github")}</span>}
      </a>
      <a
        href={SOCIAL_MEDIA_CONFIG.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
        aria-label={t("contact.social.linkedin")}
      >
        <Linkedin size={variant === "compact" ? 18 : 24} />
        {variant === "full" && <span>{t("contact.social.linkedin")}</span>}
      </a>
      {instagramLinks.map((instagram) => (
        <a
          key={instagram.username}
          href={instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
          aria-label={
            instagram.type === "portfolio"
              ? t("contact.social.instagram_portfolio")
              : t("contact.social.instagram_personal")
          }
        >
          <Instagram size={variant === "compact" ? 18 : 24} />
          {variant === "full" && (
            <span>
              {instagram.type === "portfolio"
                ? t("contact.social.instagram_portfolio")
                : t("contact.social.instagram_personal")}
            </span>
          )}
        </a>
      ))}
    </div>
  );

  if (variant === "compact") {
    const contactButton = (
      <Link
        to={{ pathname: '/', hash: 'contact' }}
        className="inline-flex items-center gap-2 bg-skyblue/20 hover:bg-skyblue/30 transition-all duration-300 px-6 py-3 rounded-full border-2 border-white hover:border-skyblue group"
      >
        <Mail size={20} className="group-hover:scale-110 transition-transform duration-300" />
        <span className="text-lg font-semibold">{t("contact.title")}</span>
      </Link>
    );
    return (
      <footer className="mt-20 py-12 bg-navy text-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          {contactButtonDelay > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: contactButtonDelay / 1000 }}
            >
              {contactButton}
            </motion.div>
          ) : (
            contactButton
          )}
        </div>
      </footer>
    );
  }

  return (
    <footer className="py-20 bg-navy text-white dark:bg-gray-900" id="contact">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-6">{t("contact.title")}</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">{t("contact.description")}</p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <a
              href={`mailto:${t("contact.email")}`}
              className="inline-flex items-center space-x-3 bg-white/10 hover:bg-white/20 transition-all duration-300 px-8 py-4 rounded-full border-2 border-white hover:border-white group"
            >
              <Mail size={28} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xl font-semibold text-white">{t("contact.email")}</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8"
          >
            {socialLinks}
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};
