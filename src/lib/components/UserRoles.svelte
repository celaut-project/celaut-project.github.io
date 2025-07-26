<script>
  // Datos de los roles definidos en un solo lugar para fácil mantenimiento.
  const roles = [
    {
      title: 'Node Maintainers',
      description: 'Similar to miners in blockchain systems, node maintainers provide computational resources to the network. They execute services requested by users in exchange for payment, without needing to understand the specific functionality of those services.',
      points: [
        'Provide hardware resources',
        'Execute services on request',
        'Receive compensation for resources',
      ],
    },
    {
      title: 'Service Developers',
      description: 'Developers create services that can run on any compatible node in the network. They focus on building functionality without worrying about the underlying infrastructure details.',
      points: [
        'Design service specifications',
        'Build deterministic applications',
        'Distribute services to nodes',
      ],
    },
    {
      title: 'Service Users',
      description: 'End users launch services on nodes, paying for the computational resources used.',
      points: [
        'Request service execution',
        'Pay for computational resources',
        'Consume service outputs',
      ],
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
      </div>
    {/each}
  </div>
</section>

<style>
  section {
    background-color: #1d4241;
    padding: 80px 20px;
  }

  h2 {
    font-size: 2.5rem;
    text-align: center;
    max-width: 700px;
    margin: 0 auto 60px auto;
    color: #f9eee7;
  }

  .roles-container {
    display: flex;
    flex-direction: column;
    gap: 25px;
    max-width: 900px;
    margin: 0 auto;
  }

  .role-block {
    background-color: rgba(249, 238, 231, 0.03);
    border: 1px solid rgba(249, 238, 231, 0.1);
    border-left: 5px solid #ef9c82; /* El borde que pediste anteriormente */
    padding: 30px 35px;
    border-radius: 16px;
  }

  h3 {
    font-size: 1.4rem;
    margin: 0 0 10px 0;
    color: #f9eee7;
  }

  p {
    margin: 0 0 20px 0;
    line-height: 1.7;
    color: rgba(249, 238, 231, 0.85);
  }

  ul {
    padding-left: 22px;
    margin: 0;
  }

  /* ✨ ESTILO VISUAL AÑADIDO ✨ */
  /* Se resalta la lista de responsabilidades (la parte importante). */
  li {
    margin-bottom: 10px;
    line-height: 1.6;
    color: #ef9c82; /* Color de acento para destacar el texto */
    font-weight: 500; /* Fuente semigruesa para más énfasis */
  }

  li:last-child {
    margin-bottom: 0;
  }
</style>