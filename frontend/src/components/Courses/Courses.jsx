import { courses } from '../../data/siteData.js';

export default function Courses() {
  return (
    <section className="section alt" id="courses">
      <div className="container">
        <div className="section-head">
          <div className="kicker">IKS-LMS</div>
          <h2>Featured Courses</h2>
          <p>
            Structured online learning programs in Indian Knowledge Systems, Sanskrit
            and scriptural studies.
          </p>
        </div>
        <div className="course-grid">
          {courses.map((course) => (
            <article className="course" key={course.title}>
              <div className="course-top">{course.topLabel}</div>
              <div className="course-body">
                <div className="course-meta">
                  <span>{course.lessons}</span>
                  <span>{course.level}</span>
                </div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <a className="link" href={course.href}>
                  View Course →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
