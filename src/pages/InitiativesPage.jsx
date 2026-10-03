import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import SiteBubbles from '../components/SiteBubbles.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';
import DonateModal from '../components/Modals/DonateModal.jsx';
import { PageHero, DetailRow } from '../components/PageSections/PageSections.jsx';
import '../styles/pages.css';

const initiatives = [
  {
    id: 'svadhyaya',
    kicker: 'Study & Search',
    title: 'Svādhyāya',
    paragraphs: [
      'Svādhyāya is a flagship initiative of SASTRANIDHI envisioned as a comprehensive digital repository and study platform for Vedic literature and the entire spectrum of Indian Knowledge Systems (IKS).',
      'Its purpose is to bring the vast and diverse knowledge traditions of Bhārata onto a single, systematically organised platform where students, scholars, researchers, teachers, practitioners, and seekers can discover, study, search, connect, and explore texts and knowledge traditions across disciplines.',
      'At the heart of Svādhyāya is a structured network of Mañjūṣās — knowledge collections, each dedicated to a major stream of Indian learning.',
    ],
    list: [
      'Veda Mañjūṣā — Vedic Literature: A comprehensive collection of traditional Vedic and allied śāstric literature, including the Vedas, Vedāṅgas, Upavedas, Purāṇas, Itihāsas, Darśanas, Dharmaśāstras, Āgamas, Tantras, and related textual traditions.',
      'Vaiṣṇava Mañjūṣā — Vaiṣṇava Literature: Literature representing the four principal Vaiṣṇava sampradāyas along with the Gauḍīya Vaiṣṇava tradition, including foundational texts, commentaries, philosophical works, devotional literature, biographies, hymns, manuals, and later works.',
      'Sāhitya Mañjūṣā — Classical Literature: A repository of the rich literary heritage of India, encompassing Sanskrit poetry, prose, drama, campū literature, and other classical literary forms.',
      'Vijñāna Mañjūṣā — Scientific and Technical Knowledge: A subject-based collection covering India’s traditional scientific, technical, intellectual, and historical knowledge across disciplines such as mathematics, astronomy, medicine, architecture, polity, economics, agriculture, arts, and other branches of knowledge.',
      'Śrī Kṛṣṇa Mañjūṣā — ISKCON Literature: A dedicated repository comprising the works of Śrīla A. C. Bhaktivedanta Swami Prabhupāda and the works of his followers, preserving and organising the literary contribution of the ISKCON tradition.',
      'Apara Mañjūṣā — Other Indian Philosophical Traditions: A collection representing Advaita, Buddhist, Jaina, Cārvāka/Lokāyata, independent Indian philosophers, and other significant streams of Indian thought.',
      'Mahātma Mañjūṣā — Lives of Great Souls: A biographical repository documenting the lives, teachings, contributions, and legacy of saints, ācāryas, sages, scholars, rulers, reformers, and other great personalities of India.',
      'Kīrtana Mañjūṣā — Songs of Traditional India: A collection of India’s devotional and traditional musical heritage, including kīrtanas, bhajanas, stotras, traditional compositions, regional devotional songs, and associated musical traditions.',
      'Bhārata Mañjūṣā — Indian History: A structured presentation of the history of Bhārata from ancient times through the medieval and modern periods up to India’s Independence, drawing attention to personalities, kingdoms, institutions, cultural developments, and historical sources.',
      'Saṁskṛta Mañjūṣā — Sanskrit for Scriptural Study: A learning environment designed especially for those who wish to acquire Sanskrit for understanding śāstric texts, with emphasis on vocabulary, grammar, sentence construction, and the language commonly encountered in Vedic and classical literature.',
      'Saṁskṛti Mañjūṣā — Indian Culture and Traditions: A repository devoted to India’s living cultural heritage, including classical and traditional music, dance, festivals, customs, rituals, arts, architecture, dress, food traditions, and other expressions of Bhāratīya culture.',
    ],
    paragraphsAfter: [
      'Svādhyāya is therefore envisioned not merely as a collection of digitised books, but as an interconnected knowledge ecosystem. Users will progressively be able to search across texts, authors, traditions, subjects, personalities, historical periods, songs, cultural practices, and scientific disciplines.',
      'The platform aims to connect primary texts with their translations, commentaries, authors, traditions, subjects, related works, biographies, and contextual knowledge, enabling a learner to move naturally from a single verse or concept to the wider intellectual tradition surrounding it.',
      'The long-term vision of Svādhyāya is to become one of the world’s largest and most systematically organised digital repositories of Indian Knowledge Systems, bringing together the depth of traditional learning with the accessibility, searchability, and interconnectedness made possible by modern technology.',
      'Through Svādhyāya, SASTRANIDHI seeks not only to preserve India’s knowledge heritage, but to make it accessible, searchable, understandable, interconnected, and available for serious study for generations to come.',
    ],
    ticks: [
      'Research repositories and publications',
      'Event archives and announcements',
      'Scholar and project profiles',
    ],
    action: { to: 'https://reader.sastranidhi.org/homePage', label: 'Open Svādhyāya →' },
    card: {
      title: 'On the platform',
      items: ['Digital library reader', 'Publication catalogue', 'Project pages'],
    },
  },
  {
    id: 'visleshaka',
    kicker: 'Analyze & Assimilate',
    title: 'Viśleṣaka: Purāṇatilakam',
    paragraphs: [
      'Viśleṣaka is SASTRANIDHI’s analytical platform for the in-depth study of major scriptures from every possible perspective.',
      'While Svādhyāya enables users to discover, search, and study a vast body of literature, Viśleṣaka focuses on taking an individual scripture and examining it in extraordinary depth. Each major text is envisioned as a dedicated analytical environment bringing together the textual, grammatical, commentarial, thematic, visual, numerical, and oral dimensions of that scripture.',
      'A Viśleṣaka platform may include the original text, multiple traditional commentaries, translations, word-by-word analysis, grammatical study, anvaya, vocabulary, cross-references, thematic classifications, presentations, recitations, audio resources, statistics, charts, structural analysis, and other study tools relevant to that particular scripture.',
      'The objective is to allow a user to move seamlessly from a single verse to its words, grammar, meanings, commentarial traditions, related passages, themes, presentations, recitations, and broader textual context—all within one integrated study environment.',
      'Over time, SASTRANIDHI envisions developing dedicated Viśleṣaka platforms for each of the major scriptures, so that important works of the Indian scriptural tradition can be studied not merely as digital texts, but as deeply interconnected knowledge systems.',
      { heading: 'For Śrīmad-Bhāgavatam: Purāṇa Tilakam' },
      'Purāṇa Tilakam is the first major example of the Viśleṣaka vision, developed specifically for the Śrīmad-Bhāgavatam.',
      'It brings together multiple dimensions of Bhāgavata study—including the Sanskrit text, translations, traditional commentaries, grammatical and linguistic analysis, presentations, recitations, cross-references, structural information, statistics, and other research-oriented tools—within a unified digital environment.',
      'Purāṇa Tilakam serves as the model for how Viśleṣaka platforms can eventually be developed for other major scriptures, creating a new standard for comprehensive digital scriptural study and research.',
    ],
    ticks: [
      'Verse-by-verse text with commentaries',
      'Translations and cross-references',
      'Search and research tools',
    ],
    action: { to: 'https://puranatilakam.com/', label: 'Open Purāṇatilakam →' },
    card: {
      dark: true,
      title: 'Best for',
      items: [
        'Students of the Bhāgavatam',
        'Researchers comparing commentaries',
        'Teachers preparing lessons',
      ],
    },
  },
  {
    id: 'pariprasna',
    kicker: 'Questions & Answers',
    title: 'Paripraśna',
    paragraphs: [
      'Paripraśna is SASTRANIDHI’s interactive knowledge platform dedicated to questions, answers, and scholarly dialogue on Vedic literature and Indian Knowledge Systems (IKS).',
      'The name Paripraśna is inspired by Bhagavad-gītā 4.34, where Śrī Kṛṣṇa teaches the importance of approaching realized teachers with humility, sincere inquiry, and service:',
      {
        verse: [
          'tad viddhi praṇipātena',
          'paripraśnena sevayā',
          'upadekṣyanti te jñānaṁ',
          'jñāninas tattva-darśinaḥ',
        ],
      },
      '“Learn the truth by approaching those who have seen reality. Inquire from them sincerely and render service; such learned souls can impart knowledge because they have seen the truth.”',
      'Reflecting this spirit of meaningful inquiry, Paripraśna enables every registered user to ask questions related to scriptures, philosophy, theology, Sanskrit, traditional sciences, history, culture, and the broader field of Indian Knowledge Systems.',
      'Users can also browse and search previously answered questions, making Paripraśna not only a platform for individual enquiry but also a growing repository of structured questions and scholarly answers.',
      'Questions are addressed by qualified scholars and subject experts associated with the SASTRANIDHI team, with an emphasis on authenticity, scriptural grounding, clarity, and responsible interpretation.',
      'Over time, Paripraśna is envisioned as a continuously expanding knowledge base where recurring questions, difficult concepts, comparative issues, and specialised topics are preserved for future learners and researchers.',
      'By combining the traditional spirit of śāstric inquiry with a modern digital platform, Paripraśna seeks to create a trusted space where genuine questions lead to deeper understanding, informed discussion, and meaningful engagement with India’s knowledge traditions.',
    ],
    ticks: [
      'Ask and browse questions',
      'Answers from scholars and experts',
      'Topics organised by tags and scriptures',
    ],
    action: { to: 'https://qna.sastranidhi.org/', label: 'Open Paripraśna →' },
    card: {
      title: 'Sections',
      items: ['Questions', 'Experts', 'Scriptures', 'Debates', 'AI Chat'],
    },
  },
  {
    id: 'pravacana',
    kicker: 'Courses & Discourses',
    title: 'Pravacana',
    paragraphs: [
      'Pravacana is SASTRANIDHI’s Learning Management System (LMS), created to provide structured, systematic, and accessible learning in Vedic literature and Indian Knowledge Systems (IKS).',
      'The name Pravacana draws inspiration from the timeless instruction of the Taittirīya Upaniṣad, Śikṣāvallī 1.11.1:',
      { verse: ['svādhyāya-pravacanābhyāṁ na pramaditavyam'] },
      '“One should not neglect study and teaching.”',
      'This Upaniṣadic principle beautifully reflects the purpose of Pravacana: knowledge is to be continuously studied, understood, taught, discussed, and transmitted from one generation to the next.',
      'Pravacana brings together a growing corpus of structured courses, recorded discourses, books, study guides, learning materials, presentations, assignments, assessments, reading resources, and certification programmes within a single digital learning environment.',
      'Courses may range from introductory learning to advanced and specialised study across subjects such as the Vedas, Upaniṣads, Bhagavad-gītā, Purāṇas, Itihāsas, Darśanas, Sanskrit, Vaiṣṇava literature, Indian philosophy, traditional sciences, history, culture, and the wider field of Indian Knowledge Systems.',
      'Learners will be able to follow organised learning paths, attend or access discourses, study prescribed material, complete assignments and assessments, track their learning progress, and receive certification for selected programmes.',
      'Pravacana is envisioned not merely as a collection of recorded lectures, but as a complete digital learning ecosystem where traditional knowledge can be taught through well-structured curricula while benefiting from the accessibility and flexibility of modern educational technology.',
      'It will also provide a platform for ācāryas, scholars, teachers, institutions, and subject experts to offer systematic courses and specialised learning programmes to students across the world.',
      'Through Pravacana, SASTRANIDHI seeks to strengthen the living tradition of svādhyāya and pravacana — continuous study and the responsible transmission of knowledge — ensuring that India’s intellectual and spiritual heritage is not only preserved, but actively learned, taught, and carried forward.',
    ],
    ticks: [
      'Self-paced and guided courses',
      'Assessments and certificates',
      'Discourse recordings',
    ],
    action: { to: '/courses', label: 'Open Pravacana →' },
    card: {
      dark: true,
      title: 'Featured tracks',
      items: ['Indian Philosophy', 'Bhagavad-gītā', 'Sanskrit'],
    },
  },
];

export default function InitiativesPage() {
  return (
    <>
      <SiteBubbles />
      <Header />
      <main>
        <PageHero
          crumb="Initiatives"
          title="Knowledge Initiatives"
          lede="Focused platforms and programmes for study, analysis, inquiry and learning across the Indian knowledge traditions."
        />

        <section className="detail">
          <div className="wrap">
            {initiatives.map((row) => (
              <DetailRow key={row.title} {...row} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <DonateModal />
      <WhatsAppFloat />
    </>
  );
}
