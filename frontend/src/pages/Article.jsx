import { useParams } from "react-router-dom";
import "./Article.css";

const articles = {
  "reduce-cloud-spend": {
    title: "How Companies Reduce Cloud Spend by 30%",
    content: `
Companies achieve 30% cloud cost reductions through targeted optimization strategies like rightsizing resources and leveraging discounts, often without sacrificing performance. These methods address common issues such as overprovisioning and idle resources, which can account for up to 40% of waste.
Rightsizing matches instance sizes to actual usage patterns, eliminating overprovisioned capacity. Auto-scaling dynamically adjusts resources based on demand, ensuring payment only for what's needed during peaks or lulls. Reserved instances and spot pricing offer discounts of 30-60% for committed or interruptible workloads.

Shut down idle resources, like dev/test environments after hours, using automation scripts.

Implement lifecycle policies for storage, moving data to cheaper tiers like Glacier.
​

Monitor networking costs, such as cross-AZ transfers, with tools like AWS Cost Explorer.

A FinTech company cut AWS costs by 30% via rightsizing, spot instances for batch jobs, and reserved instances for steady workloads. Another SaaS firm reduced spend by 55% ($27.5K monthly) through right-sizing, auto-scaling, and FinOps practices. An enterprise achieved 45% savings ($90K monthly) by adding cost allocation tags and eliminating underutilized assets.

Start with a full audit to identify waste, using native tools like AWS Compute Optimizer or third-party FinOps platforms. Set up alerts and policies for automatic shutdowns and scaling. Regularly review usage with teams to sustain gains, targeting 20-40% overall reductions.

Tools and Best Practices
Adopt continuous monitoring with CloudHealth or AWS Budgets for real-time insights. For developers, integrate cost-aware coding, like using serverless for bursty tasks. These practices scale across AWS, Azure, and GCP, with many firms reporting sustained 30%+ savings.

`
  },

  "auto-scaling-vs-fixed": {
    title: "Auto Scaling vs Fixed Servers",
    content: `
In the fast-paced world of web and app development, choosing the right server scaling strategy can make or break your application's performance, cost, and reliability. Fixed servers offer predictable resources, while auto scaling dynamically adjusts to demand. As you build responsive React apps or fintech platforms with fluctuating traffic, understanding these options helps you design smarter architectures.

This article breaks down the differences, pros, cons, and when to pick each—drawing from cloud providers like AWS, Azure, and Google Cloud.

What Are Fixed Servers?
Fixed servers (also called static or on-demand instances) provision a set number of servers with consistent resources like CPU, RAM, and storage. You manually size and manage them, paying for full capacity regardless of usage.

Example: A React/Next.js app hosted on a single EC2 instance or a VPS with 4 vCPUs and 16GB RAM. Traffic spikes? You upgrade manually or add replicas ahead of time.

What Is Auto Scaling?
Auto scaling automatically adds or removes server resources based on metrics like CPU utilization, traffic, or custom rules. It integrates with load balancers to distribute traffic across a dynamic fleet.

Example: An AWS Auto Scaling Group for your TypeScript-based fintech app. During peak hours (e.g., payment processing rushes), it spins up extra EC2 instances; idle times scale down to save costs.

Pros and Cons of Fixed Servers
Pros:

Easy to predict and budget—no surprises.

Full control over hardware specs.

Simpler for small teams or dev environments.

Cons:

Wasteful during low traffic (paying for idle resources).

Manual intervention for scaling leads to outages.

Doesn't adapt to bursts, like viral app launches.

Real-world tip: Great for your automobile client web designs with steady internal traffic.

Pros and Cons of Auto Scaling
Pros:

Cost-efficient—scale down when idle (e.g., 70% savings on nights/weekends).

High availability with automatic failover.

Handles unpredictable loads, perfect for user-facing apps.

Cons:

Initial setup overhead (policies, alarms).

Potential "scale storm" if metrics misfire.

Slightly higher latency on cold starts.

Real-world tip: Ideal for fintech payment apps where user spikes hit during sales or paydays.

When to Choose Each Strategy
Pick Fixed Servers if your app has consistent, low-to-moderate traffic—like internal dashboards or static sites. They're cheaper upfront for startups testing MVPs.

Go Auto Scaling for production apps with variable demand, such as e-commerce, SaaS, or mobile backends. Tools like Kubernetes or serverless (e.g., AWS Lambda) take it further.

Hybrid Approach: Start fixed for prototyping, then migrate to auto scaling as your React/TypeScript app grows.

Cost Example: A Quick Calculation
Imagine a mid-sized web app with average 2 vCPU instances:

Fixed: 5 instances always on = ~$300/month (AWS t3.medium).

Auto Scaling: Averages 2-8 instances = ~$150-250/month, scaling to demand.

Use calculators like AWS Pricing to model your setup.

Final Thoughts: Scale Smart, Not Hard
Auto scaling edges out for most modern apps due to elasticity and cost savings, but fixed servers shine in simplicity. Evaluate your traffic patterns—tools like New Relic or CloudWatch help. For your full-stack projects, start experimenting with auto scaling in a staging environment to see real gains.
`
  },

  "reserved-instances": {
    title: "Reserved Instances Explained",
    content: `
    Reserved Instances (RIs) offer a cost-saving way to commit to cloud compute capacity upfront for discounted rates compared to on-demand pricing. Primarily associated with AWS EC2, they apply billing discounts automatically to matching running instances without reserving physical hardware.

How They Work
Reserved Instances provide up to 72% savings on EC2 usage by locking in capacity for 1- or 3-year terms in a specific region, instance type, and availability zone. When you purchase an RI matching your running On-Demand instance's attributes—like m4.large in us-east-1a—the discount applies immediately to that usage, even if you stop and restart the instance. They are flexible: regional RIs cover any AZ in the region, while zonal ones guarantee capacity in a specific AZ.

Types and Payment Options
RIs come in Standard (most flexible, modifiable) and Convertible (lower discount but changeable to different instance types). Payment choices include All Upfront (biggest discount, full payment now), Partial Upfront (some now, rest monthly), and No Upfront (all monthly, smallest discount). You can buy from AWS directly, the Reserved Instance Marketplace for shorter terms, or third-party sellers.


`
  },

  "cloud-cost-mistakes": {
    title: "Common Cloud Cost Mistakes",
    content: `
Top mistakes companies make:

• Overprovisioning servers  
• Not deleting unused storage  
• Ignoring cost monitoring  
• No scaling automation  

Avoiding these reduces bills drastically.
`
  }
};

export default function Article() {
  const { slug } = useParams();
  const article = articles[slug];

  if (!article) {
    return <h2 style={{ padding: "60px" }}>Article not found</h2>;
  }

  return (
    <div className="article-page">
      <h1>{article.title}</h1>

      <pre className="article-content">
        {article.content}
      </pre>
    </div>
  );
}
