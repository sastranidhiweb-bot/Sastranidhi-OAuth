import { courses } from '../../data/siteData.js';
import '../../styles/courses.css';

export default function Courses() {
  return (
    <section id="courses">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="kicker">IKS-LMS</div>
          <h2>Featured Courses</h2>
          <p>
            Structured online learning programs in Indian Knowledge Systems, Sanskrit
            and scriptural studies.
          </p>
        </div>
        <div className="course-grid stagger">
          {courses.map((course) => (
            <div className="course" key={course.title}>
              <div className="head">
                <div className="level">{course.level}</div>
                <h3>{course.topLabel}</h3>
              </div>
              <div className="body">
                <div className="meta">
                  <span>{course.lessons}</span>
                  <span>{course.level}</span>
                </div>
                <h4>{course.title}</h4>
                <p>{course.description}</p>
                <a href={course.href} target="_blank" rel="noopener noreferrer">
                  View Course →
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="section-more reveal">
          <a className="btn-outline" href="/courses">
            See all courses →
          </a>
        </div>
      </div>
    </section>
  );
}