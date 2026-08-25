<script>
  // Datos de los roles definidos en un solo lugar para fácil mantenimiento.
  const SKILLS_URL = 'https://celaut-project.github.io/skills';
  const roles = [
    {
      title: 'Node Maintainers',
      description: 'Similar to miners in blockchain systems, node maintainers provide computational resources to the network. They execute services requested by users in exchange for payment, without needing to understand the specific functionality of those services.',
      points: [
        'Provide hardware resources',
        'Execute services on request',
        'Receive compensation for resources',
      ],
      // Node operators head to the install flow to run a node.
      cta: { label: 'Run a node', href: '/install', external: false },
    },
    {
      title: 'Service Developers',
      description: 'Developers create services that can run on any compatible node in the network. They focus on building functionality without worrying about the underlying infrastructure details.',
      points: [
        'Design service specifications',
        'Build deterministic applications',
        'Distribute services to nodes',
      ],
      cta: { label: 'Explore Skills', href: SKILLS_URL, external: true },
    },
    {
      title: 'Service Users',
      description: 'End users launch services on nodes, paying for the computational resources used.',
      points: [
        'Request service execution',
        'Pay for computational resources',
        'Consume service outputs',
      ],
      cta: { label: 'Explore Skills', href: SKILLS_URL, external: true },
    },
  ];
</script>

<section>
  <h2>User Roles in the Celaut Ecosystem</h2>

  <div class="roles-container">
    {#each roles as role}
      <div class="role-block">
        <h3>{role.title}</h3>
        <p>{role.description}</p>
        <ul>
          {#each role.points as point}
            <li>{point}</li>
          {/each}
        </ul>
        {#if role.cta}
          {#if role.cta.external}
            <a class="role-cta" href={role.cta.href} target="_blank" rel="noopener noreferrer">
              {role.cta.label} →
            </a>
          {:else}
            <a class="role-cta" href={role.cta.href}>{role.cta.label} →</a>
          {/if}
        {/if}
      </div>
    {/each}
  </div>
</section>

<style>
  section {
    background-color: var(--surface);
    padding: 80px 20px;
  }

  h2 {
    font-size: 2.5rem;
    text-align: center;
    max-width: 700px;
    margin: 0 auto 60px auto;
    color: var(--heading);
  }

  .roles-container {
    display: flex;
    flex-direction: column;
    gap: 25px;
    max-width: 900px;
    margin: 0 auto;
  }

  .role-block {
    background-color: var(--surface-raised);
    border: 1px solid var(--border);
    border-left: 5px solid var(--accent);
    padding: 30px 35px;
    border-radius: 16px;
    box-shadow: var(--shadow-sm);
  }

  h3 {
    font-size: 1.4rem;
    margin: 0 0 10px 0;
    color: var(--on-surface);
  }

  p {
    margin: 0 0 20px 0;
    line-height: 1.7;
    color: var(--on-surface-muted);
  }

  ul {
    padding-left: 22px;
    margin: 0;
  }

  /* Responsibilities list. Uses --accent-text (not the decorative --accent):
     the raw coral measured ~1.9:1 on the light surface, so this list was
     effectively unreadable in light mode. */
  li {
    margin-bottom: 10px;
    line-height: 1.6;
    color: var(--accent-text);
    font-weight: 500;
  }

  li:last-child {
    margin-bottom: 0;
  }

  .role-cta {
    display: inline-block;
    margin-top: 22px;
    padding: 9px 20px;
    background-color: var(--accent);
    color: var(--on-accent);
    border-radius: 8px;
    font-weight: 700;
    text-decoration: none;
    transition: background-color 0.2s ease, transform 0.2s ease;
  }

  .role-cta:hover {
    background-color: var(--accent-hover);
    transform: translateY(-2px);
  }
</style>