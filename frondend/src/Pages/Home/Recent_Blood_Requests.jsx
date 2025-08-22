import React, { useRef } from 'react';
import '../../assets/styles/Recent_Blood_Requests.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HomePage = () => {
  const scrollContainerRef = useRef(null);

  const requests = [
    { bloodGroup: "A+", location: "New York, NY", contact: "+1 (555) 123-4567", urgency: "High", time: "2 hours ago" },
    { bloodGroup: "O-", location: "Los Angeles, CA", contact: "+1 (555) 987-6543", urgency: "Medium", time: "4 hours ago" },
    { bloodGroup: "B+", location: "Chicago, IL", contact: "+1 (555) 789-1234", urgency: "Critical", time: "30 mins ago" },
    { bloodGroup: "AB-", location: "Houston, TX", contact: "+1 (555) 456-7890", urgency: "Low", time: "1 day ago" },
    { bloodGroup: "O+", location: "Miami, FL", contact: "+1 (555) 321-4560", urgency: "High", time: "3 hours ago" },
    { bloodGroup: "A-", location: "Seattle, WA", contact: "+1 (555) 654-9870", urgency: "Medium", time: "5 hours ago" }
  ];

  const getUrgencyClass = (urgency) => {
    switch (urgency.toLowerCase()) {
      case "critical": return "Critical";
      case "high": return "High";
      case "medium": return "Medium";
      case "low": return "Low";
      default: return "";
    }
  };

  const scroll = (scrollOffset) => {
    scrollContainerRef.current.scrollBy({
      left: scrollOffset,
      behavior: "smooth"
    });
  };

  return (
    <div className="home-page">
      {/* Recent Blood Requests Section */}
      <div className="requests-home-container">
        <h2>Recent Blood Requests / Urgent Needs</h2>

        <div className="scroll-buttons">
          <button onClick={() => scroll(-300)} className="scroll-btn left-btn-1">
            <FaChevronLeft />
          </button>

          <div className="requests-scroll-container" ref={scrollContainerRef}>
            <div className="requests-grid">
              {requests.map((request, index) => (
                <div key={index} className={`request-card ${getUrgencyClass(request.urgency)}`}>
                  <div className="card-header">
                    <h3>{request.bloodGroup}</h3>
                    <span className={`urgency-tag ${getUrgencyClass(request.urgency)}`}>
                      {request.urgency}
                    </span>
                  </div>
                  <p><FaMapMarkerAlt /> {request.location}</p>
                  <p><FaPhoneAlt /> {request.contact}</p>
                  <p><FaClock /> {request.time}</p>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => scroll(300)} className="scroll-btn right-btn-1">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
