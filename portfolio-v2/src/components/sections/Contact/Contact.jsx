import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import { useSound } from '../../../hooks/useSound';
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  MailIcon,
  LocationIcon,
  BriefcaseIcon,
  GuitarIcon,
  SendIcon,
  CheckIcon,
  XIcon,
  LoaderIcon,
  MusicNoteIcon
} from '../../common/Icons';
import BackgroundParticles from '../../common/BackgroundParticles';
import './Contact.css';

const Contact = () => {
  const { targetRef, hasIntersected } = useIntersectionObserver();
  const { playClick } = useSound();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClick();
    setFormStatus('sending');

    // TODO: Implement actual API call to Vercel Serverless Function
    // For now, simulate sending
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1500);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: GithubIcon,
      url: 'https://github.com/Paprika-jr',
      color: '#333',
    },
    {
      name: 'LinkedIn',
      icon: LinkedinIcon,
      url: 'https://www.linkedin.com/in/khun-htet-lin-aung-225273323/',
      color: '#0077b5',
    },
    {
      name: 'Instagram',
      icon: InstagramIcon,
      url: 'https://www.instagram.com/ht3tlin_a?igsh=NTZ1emkyMTIydGpq&utm_source=qr',
      color: '#E4405F',
    },
    {
      name: 'Email',
      icon: MailIcon,
      url: 'mailto:hlin14046@gmail.com',
      color: '#ea4335',
    },
  ];

  return (
    <section className="contact-section" data-section id="contact" ref={targetRef}>
      <BackgroundParticles />
      <div className="container">
        {/* Section Header */}
        <div className={`section-header ${hasIntersected ? 'in-view' : ''}`}>
          <motion.div
            className="section-tag"
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Let's Connect
          </motion.div>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Get in Touch
          </motion.h2>
          <motion.p
            className="section-description"
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have a project in mind? Let's make some noise together
          </motion.p>
        </div>

        <div className="contact-content">
          {/* Contact Form - Styled as Guitar Amp */}
          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: -50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="amp-header">
              <div className="amp-logo">KHLA</div>
              <div className="amp-model">Contact Amplifier</div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={formStatus === 'sending'}
                  data-cursor-hover
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={formStatus === 'sending'}
                  data-cursor-hover
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                  disabled={formStatus === 'sending'}
                  data-cursor-hover
                />
              </div>

              <button
                type="submit"
                className={`submit-btn ${formStatus}`}
                disabled={formStatus === 'sending'}
                data-cursor-hover
              >
                {formStatus === 'idle' && (
                  <>
                    <GuitarIcon size={20} /> Send Message
                  </>
                )}
                {formStatus === 'sending' && (
                  <>
                    <LoaderIcon size={20} className="spinning" /> Sending...
                  </>
                )}
                {formStatus === 'success' && (
                  <>
                    <CheckIcon size={20} /> Message Sent!
                  </>
                )}
                {formStatus === 'error' && (
                  <>
                    <XIcon size={20} /> Failed. Try Again
                  </>
                )}
              </button>
            </form>

            {/* Amp Speaker Grill */}
            <div className="amp-grill">
              <div className="grill-pattern"></div>
            </div>
          </motion.div>

          {/* Social Links - Styled as Pedal Board */}
          <motion.div
            className="social-links-container"
            initial={{ opacity: 0, x: 50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="social-title">Connect with Me</h3>

            <div className="pedal-board">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pedal"
                  onClick={playClick}
                  data-cursor-hover
                  initial={{ opacity: 0, y: 20 }}
                  animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="pedal-top">
                    <div className="pedal-icon">
                      <social.icon size={32} />
                    </div>
                    <div className="pedal-name">{social.name}</div>
                  </div>
                  <div className="pedal-body">
                    <div className="pedal-knob"></div>
                    <div className="pedal-led"></div>
                  </div>
                  <div className="pedal-footer">
                    <div className="pedal-switch"></div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Quick Info */}
            <motion.div
              className="quick-info"
              initial={{ opacity: 0, y: 20 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="info-item">
                <span className="info-icon">
                  <LocationIcon size={28} />
                </span>
                <div>
                  <strong>Location</strong>
                  <p>Jyväskylä, Finland</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">
                  <BriefcaseIcon size={28} />
                </span>
                <div>
                  <strong>Status</strong>
                  <p>Open to opportunities</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background Music Notes Animation */}
      <div className="floating-notes">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="music-note" style={{ '--delay': `${i * 0.5}s` }}>
            <MusicNoteIcon size={32} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Contact;
