import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HackathonSection.css';

function HackathonSection() {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <section className="hackathon-section">
      <h2>Hackathon Timeline</h2>
      <div className="hackathon-items">
        {/* Present Hackathon */}
        <div className="hackathon-item present">
          <div className="card">
            <h3>OnGoing Hackathon</h3>
            <img src="https://cdn.dribbble.com/users/30388/screenshots/2922677/uptocode-animation-loop-dribbble.gif" alt="Present Hackathon" />
            <button onClick={() => navigate('/future')}>Explore</button>
          </div>
          <div className="description">
            <p>
              Join our ongoing hackathon and showcase your skills to win amazing prizes. Collaborate with peers to create innovative solutions and get real-time feedback from mentors and judges. 
            </p>
            <p>
              This is a fantastic opportunity to network with industry professionals and gain valuable insights. Don’t miss out on the chance to present your project in front of a live audience!
            </p>
          </div>
        </div>

        {/* Future Hackathon */}
        <div className="hackathon-item future">
          <div className="card">
            <h3>UpComing Hackathon</h3>
            <img src="https://cdn.dribbble.com/users/2077073/screenshots/8227021/media/798bf7b1eaa9663d212a8588c687407a.gif" alt="Future Hackathon" />
            <button onClick={() => navigate('/future')}>Explore</button>
          </div>
          <div className="description">
            <p>
              Get ready for our upcoming hackathon. Stay tuned for more details! Prepare for a packed event with workshops and exciting challenges. Keep an eye out for registration announcements.
            </p>
            <p>
              Participants will have the chance to collaborate with diverse teams and work on real-world problems. Exciting prizes await the winners, along with opportunities to meet top-tier tech companies!
            </p>
          </div>
        </div>

        {/* Past Hackathon */}
        <div className="hackathon-item past">
          <div className="card">
            <h3>Previous Hackathon</h3>
            <img src="/assets/whatsapp_video.gif" alt="Past Hackathon GIF" style={{ width: "150px", height: "150px", objectFit: "cover" }} />
            <button onClick={() => navigate('/past')}>Explore</button>
          </div>
          <div className="description">
            <p>
              Explore the achievements and projects from our previous hackathon. Look back at the highlights of the event, where talented individuals presented their innovative ideas.
            </p>
            <p>
              Discover the winning projects that pushed the boundaries of creativity and technology. Read testimonials from participants and mentors, and see how these hackathons have made an impact in the community!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HackathonSection;