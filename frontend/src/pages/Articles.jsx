import { useState, useEffect } from "react";

export default function Articles({ darkMode }) {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    setArticles([
      {
        id: 1,
        title: "The Rise of FinOps: Why CFOs are Tracking Cloud Spend",
        category: "Cloud Strategy",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
        summary: "As cloud adoption accelerates, businesses are realizing that untracked compute resources are bleeding budgets.",
        fullText: `Over the past decade, cloud computing revolutionized how companies scale. However, the ease of provisioning servers has led to a new problem: massive, untracked cloud waste. 

FinOps (Cloud Financial Management) is the cultural practice of bringing financial accountability to the variable spend model of the cloud. Engineering and finance teams historically operated in silos. Engineers cared about uptime and speed; finance cared about budget predictability.

Today, FinOps bridges this gap. By utilizing tools that track real-time billing anomalies, tagging resources efficiently, and purchasing Reserved Instances, companies can reduce their cloud spend by up to 30% without sacrificing performance. The ultimate goal is not just saving money, but making money by maximizing the business value of cloud.`
      },
      {
        id: 2,
        title: "Multi-Cloud Strategies: AWS vs Azure vs GCP",
        category: "Architecture",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
        summary: "Vendor lock-in is a growing concern. We break down how modern startups are utilizing Kubernetes to remain cloud-agnostic.",
        fullText: `A multi-cloud strategy involves utilizing two or more cloud computing systems simultaneously. While AWS remains the dominant player, Azure has deep enterprise integrations, and GCP is renowned for its data analytics and AI capabilities.

The primary driver for a multi-cloud approach is mitigating vendor lock-in. If a provider suddenly increases prices or experiences a severe regional outage, a multi-cloud architecture allows a business to failover gracefully.

How do startups achieve this? Kubernetes and Terraform are the keys. By containerizing applications with Docker and orchestrating them with Kubernetes, the underlying infrastructure becomes irrelevant. Terraform allows teams to write Infrastructure-as-Code (IaC) that provisions resources across multiple clouds using a unified syntax.`
      },
      {
        id: 3,
        title: "AI in Cloud Optimization: The End of Manual Scaling?",
        category: "Artificial Intelligence",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
        summary: "Agentic AI models are now capable of analyzing traffic spikes and automatically provisioning instances.",
        fullText: `Traditional auto-scaling relies on rigid thresholds: "If CPU usage > 80% for 5 minutes, add 2 servers." While effective, this reactive approach often means the servers boot up too late to handle a sudden traffic spike, resulting in degraded user experience.

Enter Agentic AI. Modern Machine Learning models can analyze historical traffic patterns, social media trends, and marketing schedules to predict spikes before they happen. These agents don't just alert humans—they take action.

By integrating LLMs and predictive models with cloud APIs, the AI acts as an autonomous Cloud Architect. It can safely scale up databases ahead of a Black Friday sale, and aggressively scale down development environments during the weekend, ensuring zero waste.`
      }
    ]);
  }, []);

  return (
    <div className="articles-section">
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1 className="articles-heading" style={{ color: darkMode ? "white" : "#111827" }}>
          Cloud & Business Insights
        </h1>
        <p className="articles-subheading">
          Real-time strategies, FinOps methodologies, and technical architecture news.
        </p>
      </div>

      <div className="articles-grid">
        {articles.map((article) => (
          <div 
            key={article.id} 
            className={`article-card ${darkMode ? "dark" : "light"}`}
            onClick={() => setSelectedArticle(article)}
          >
            <div className="article-image-container">
              <img 
                src={article.image} 
                alt={article.title} 
                className="article-image"
              />
            </div>
            <div className="article-content">
              <div className="article-meta">
                <span className="article-category">{article.category}</span>
                <span className="article-read-time">{article.readTime}</span>
              </div>
              <h2 className="article-title">{article.title}</h2>
              <p className="article-summary">
                {article.summary}
              </p>
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedArticle(article); }}
                className="article-btn"
              >
                Read Full Article →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* READABLE ARTICLE MODAL */}
      {selectedArticle && (
        <div className="article-modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div 
            className={`article-modal ${darkMode ? "dark" : "light"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedArticle(null)}
              className="article-modal-close"
            >
              ✕
            </button>
            <img 
              src={selectedArticle.image} 
              alt="Header" 
              style={{ width: "100%", height: "320px", objectFit: "cover", borderRadius: "16px", marginBottom: "30px", border: "1px solid rgba(255,255,255,0.05)" }} 
            />
            <h1 className="article-title" style={{ fontSize: "2.8rem", marginBottom: "15px", lineHeight: "1.2" }}>
              {selectedArticle.title}
            </h1>
            <div style={{ color: "#6366f1", fontWeight: "bold", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "30px" }}>
              {selectedArticle.category} • {selectedArticle.readTime}
            </div>
            <div 
              style={{ 
                fontSize: "1.1rem", 
                lineHeight: "1.8", 
                color: darkMode ? "#cbd5e1" : "#334155", 
                whiteSpace: "pre-wrap", 
                fontFamily: "'Inter', sans-serif" 
              }}
            >
              {selectedArticle.fullText}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
