<section>
  <h2>Coordination Mechanisms</h2>

  <div class="coordination-grid">
    <div class="card">
      <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      </div>
      <h3>Reputation Systems</h3>
      <p class="summary">
        Builds trust and encourages quality through a history of reliable interactions.
      </p>
      <ul class="key-points">
        <li>Incentivizes high standards to maintain network standing.</li>
        <li>Rewards reliability with increased trust and interactions.</li>
        <li>Creates a self-regulating system for quality and performance.</li>
      </ul>
    </div>

    <div class="card">
      <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>
      </div>
      <h3>Payment Mechanisms</h3>
      <p class="summary">
        Facilitates the exchange of resources for value and gates access to services.
      </p>
      <ul class="key-points">
        <li>Allows nodes to exchange resources for monetary value.</li>
        <li>Requires proof of payment to access certain services.</li>
        <li>Operates flexibly and independently of the core architecture.</li>
      </ul>
    </div>
  </div>
</section>

<style>
  :root {
    --color-background: #f9eee7;
    --color-text-dark: #2c3e50; /* Un gris oscuro más neutro */
    --color-text-light: #7f8c8d; /* Un gris más suave para párrafos */
    --color-border: #e0e0e0;
    --color-card-bg: #ffffff;
  }

  section {
    background-color: var(--color-background);
    padding: 80px 20px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  h2 {
    text-align: center;
    font-size: 2.5rem;
    margin: 0 auto 60px auto;
    max-width: 800px;
    color: var(--color-text-dark);
  }

  .coordination-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    max-width: 1100px;
    margin: 0 auto;
  }

  .card {
    background-color: var(--color-card-bg);
    border-radius: 12px;
    padding: 40px 35px;
    display: flex;
    flex-direction: column;
    text-align: center;
    border: 1px solid var(--color-border);
  }

  .icon {
    margin-bottom: 20px;
    color: var(--color-text-dark);
  }

  .icon svg {
    width: 44px;
    height: 44px;
    stroke-width: 1.5;
  }

  h3 {
    font-size: 1.5rem;
    margin: 0 0 15px 0;
    font-weight: 600;
    color: var(--color-text-dark);
  }

  .summary {
    color: var(--color-text-light);
    line-height: 1.6;
    margin: 0 0 25px 0;
    flex-grow: 1;
  }

  .key-points {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .key-points li {
    color: var(--color-text-dark);
    font-weight: 500;
    display: flex;
    align-items: flex-start;
    line-height: 1.5;
  }

  .key-points li::before {
    content: '✔';
    color: var(--color-text-dark); /* Checkmark del mismo color que el texto */
    font-weight: 700;
    margin-right: 12px;
    margin-top: 1px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    .coordination-grid {
      grid-template-columns: 1fr;
      gap: 30px;
    }
     h2 {
        font-size: 2rem;
     }
  }
</style>