import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import SiteBubbles from '../components/SiteBubbles.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';
import DonateModal from '../components/Modals/DonateModal.jsx';
import { PageHero, LegalDocument } from '../components/PageSections/PageSections.jsx';
import '../styles/pages.css';

const sections = [
  {
    title: 'Our commitment',
    body: [
      'Śāstranidhi is committed to making its website and digital services accessible to as many people as possible, including users with visual, hearing, motor, or cognitive disabilities.',
      'We want every visitor to be able to read our texts, navigate the site, follow our courses, and reach us to ask questions, regardless of the device or assistive technology they use.',
    ],
  },
  {
    title: 'Standards we aim for',
    body: [
      'We aim to meet the World Wide Web Consortium’s Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA.',
      'That means, in practice:',
      {
        list: [
          'Sufficient colour contrast between text and background.',
          'Text that can be resized up to 200% without loss of content.',
          'Keyboard navigation for all interactive elements.',
          'Meaningful alternative text on images that carry information.',
          'Form fields with visible labels and clear error messages.',
          'Semantic HTML so screen readers can interpret the page structure.',
          'No content that flashes more than three times per second.',
        ],
      },
    ],
  },
  {
    title: 'What we have done so far',
    body: [
      {
        list: [
          'All pages use semantic HTML5 landmarks (header, nav, main, footer).',
          'Interactive elements (links, buttons, form fields) are reachable by keyboard and show a visible focus ring.',
          'Colour contrast has been reviewed against WCAG AA targets.',
          'The site respects the operating system’s “reduce motion” setting; users who prefer less motion will not see animations.',
          'Forms include visible labels and helpful placeholders.',
        ],
      },
    ],
  },
  {
    title: 'Known limitations',
    body: [
      'Some parts of the site are still being improved:',
      {
        list: [
          'Older PDF publications may not be fully tagged for screen readers.',
          'Some embedded third-party content (for example forms hosted by FormSubmit) may not meet our accessibility standards.',
          'Some decorative illustrations may be read by screen readers on older browsers that do not respect aria-hidden.',
        ],
      },
      'We are working to address these over time.',
    ],
  },
  {
    title: 'Feedback',
    body: [
      'If you encounter a barrier on our website, please write to us at noreply@sastranidhi.org and describe:',
      {
        list: [
          'the page or feature that gave you difficulty,',
          'the assistive technology or browser you were using,',
          'what you were trying to do.',
        ],
      },
      'We aim to respond within one business day and will do our best to provide the information you need in an accessible format.',
    ],
  },
  {
    title: 'Ongoing work',
    body: [
      'Accessibility is a continuing effort, not a one-time task. As we add new content and features, we will review them against the standards above and improve anything that does not meet them.',
      'This statement was last reviewed on the date shown at the top of this page and will be updated as the site develops.',
    ],
  },
];

export default function AccessibilityPage() {
  return (
    <>
      <SiteBubbles />
      <Header />
      <main>
        <PageHero title="Accessibility" />

        <section className="detail">
          <div className="wrap">
            <LegalDocument sections={sections} />
          </div>
        </section>
      </main>
      <Footer />
      <DonateModal />
      <WhatsAppFloat />
    </>
  );
}
