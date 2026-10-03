import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import SiteBubbles from '../components/SiteBubbles.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';
import DonateModal from '../components/Modals/DonateModal.jsx';
import { PageHero, LegalDocument } from '../components/PageSections/PageSections.jsx';
import '../styles/pages.css';

const sections = [
  {
    title: 'Introduction',
    body: [
      'Śāstranidhi (“we”, “our”, “us”) operates the website sastranidhi.org and its related subdomains and services. This Privacy Policy explains what information we collect, how we use it, and the choices you have.',
      'By using our website, you agree to the practices described here.',
    ],
  },
  {
    title: 'Information we collect',
    body: [
      'We collect only the information you voluntarily provide to us, and limited technical information needed to operate the site.',
      'Information you provide directly:',
      {
        list: [
          'Your name, when you submit a contact form, newsletter subscription, donation enquiry, or apply for a course.',
          'Your email address, for the same purposes.',
          'Your WhatsApp number, when you subscribe to the Śāstra-cakṣu eMagazine or a similar communication.',
          'The content of any message you send us through a form or by email.',
        ],
      },
      'Information collected automatically:',
      {
        list: [
          'Standard server logs (IP address, browser type, pages visited, time of visit), used for security and to understand how the site is used.',
          'Cookies or similar technologies, only where strictly necessary for the site to function.',
        ],
      },
      'We do not collect sensitive personal data, and we do not knowingly collect information from children under 13.',
    ],
  },
  {
    title: 'How we use your information',
    body: [
      'We use the information you provide only for the purpose for which you gave it:',
      {
        list: [
          'To respond to enquiries you send us.',
          'To deliver the newsletter or eMagazine you subscribed to.',
          'To process and respond to donation or support enquiries.',
          'To manage course enrolment, assessments, and certificates.',
          'To improve the content and usability of the site.',
          'To comply with legal obligations.',
        ],
      },
      'We do not sell, rent, or trade your personal information.',
    ],
  },
  {
    title: 'How we share your information',
    body: [
      'We share information only with the following categories of service providers, and only to the extent needed to run the site:',
      {
        list: [
          'FormSubmit, which processes our contact and subscription forms and delivers them to our inbox.',
          'Any hosting or infrastructure provider we use to serve the website.',
          'Authorities, if required by law.',
        ],
      },
      'We do not share your information with advertisers or marketing partners.',
    ],
  },
  {
    title: 'Data retention',
    body: [
      'We keep your information for as long as needed to fulfil the purpose for which it was collected, or as required by law. Newsletter subscribers can unsubscribe at any time, after which we remove their details from our mailing list.',
    ],
  },
  {
    title: 'Your rights',
    body: [
      'You may write to us at any time to:',
      {
        list: [
          'Ask what personal information we hold about you.',
          'Ask us to correct it.',
          'Ask us to delete it.',
          'Withdraw consent for future communications.',
        ],
      },
      'To exercise these rights, email us at noreply@sastranidhi.org.',
    ],
  },
  {
    title: 'Children',
    body: [
      'Our website and services are intended for a general audience. We do not knowingly collect personal information from children. If you believe a child has provided us information, please contact us and we will remove it.',
    ],
  },
  {
    title: 'Security',
    body: [
      'We take reasonable technical and organisational measures to protect the information you share with us. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    title: 'Changes to this policy',
    body: [
      'We may update this Privacy Policy from time to time. The revised version will be published on this page with a new “last updated” date.',
    ],
  },
  {
    title: 'Contact',
    body: ['For any question about this Privacy Policy, write to noreply@sastranidhi.org.'],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteBubbles />
      <Header />
      <main>
        <PageHero title="Privacy Policy" />

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
