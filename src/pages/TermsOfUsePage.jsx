import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import SiteBubbles from '../components/SiteBubbles.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';
import DonateModal from '../components/Modals/DonateModal.jsx';
import { PageHero, LegalDocument } from '../components/PageSections/PageSections.jsx';
import '../styles/pages.css';

const sections = [
  {
    title: 'Acceptance of terms',
    body: [
      'By accessing or using sastranidhi.org and its related subdomains and services (the “Site”), you agree to be bound by these Terms of Use. If you do not agree, please do not use the Site.',
    ],
  },
  {
    title: 'About the Site',
    body: [
      'Śāstranidhi is a non-profit educational initiative dedicated to the study, preservation, and dissemination of Indian Knowledge Systems. The Site provides access to texts, research materials, courses, publications, and community platforms.',
    ],
  },
  {
    title: 'Use of the Site',
    body: [
      'You agree to use the Site only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the Site. In particular, you agree not to:',
      {
        list: [
          'Copy, reproduce, or republish substantial parts of the Site’s content without written permission.',
          'Use automated tools to scrape, crawl, or bulk-download the Site or its content, except as permitted by the Site’s robots.txt.',
          'Attempt to gain unauthorised access to any part of the Site or its supporting infrastructure.',
          'Misrepresent the source of any material obtained from the Site.',
          'Use the Site to transmit unlawful, defamatory, or harmful content.',
        ],
      },
    ],
  },
  {
    title: 'Intellectual property',
    body: [
      'Unless otherwise stated, all content on the Site — including text, translations, commentaries, images, logos, and design — is the property of Śāstranidhi or its contributors and is protected by copyright.',
      'You may read, share links to, and quote short passages of the Site for personal study, teaching, or non-commercial research, provided you clearly attribute the source.',
      'For any other use — including republication, translation, or commercial use — you must obtain written permission by writing to noreply@sastranidhi.org.',
    ],
  },
  {
    title: 'User accounts',
    body: [
      'Some parts of the Site may require an account. You are responsible for keeping your login details confidential and for all activity that occurs under your account.',
    ],
  },
  {
    title: 'Third-party links',
    body: [
      'The Site may link to third-party websites that we do not control. We provide those links for convenience only and are not responsible for the content, policies, or practices of those sites.',
    ],
  },
  {
    title: 'No warranty',
    body: [
      'The Site and its content are provided “as is” and “as available”. While we take care to present authentic and accurate material, we make no warranty that the Site will be uninterrupted, error-free, or free of inaccuracies.',
    ],
  },
  {
    title: 'Limitation of liability',
    body: [
      'To the fullest extent permitted by law, Śāstranidhi will not be liable for any indirect, incidental, or consequential loss arising from your use of the Site.',
    ],
  },
  {
    title: 'Changes to the Site and these terms',
    body: [
      'We may change, suspend, or discontinue any part of the Site at any time. We may also update these Terms of Use from time to time. The revised version will be published on this page with a new “last updated” date.',
    ],
  },
  {
    title: 'Governing law',
    body: [
      'These Terms of Use are governed by the laws of India. Any dispute arising in connection with the Site will be subject to the exclusive jurisdiction of the courts of Hyderabad, Telangana.',
    ],
  },
  {
    title: 'Contact',
    body: ['For any question about these Terms of Use, write to noreply@sastranidhi.org.'],
  },
];

export default function TermsOfUsePage() {
  return (
    <>
      <SiteBubbles />
      <Header />
      <main>
        <PageHero title="Terms of Use" />

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
