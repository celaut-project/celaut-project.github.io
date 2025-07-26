<script>
    import Cpu from '$lib/assets/icons/Cpu.svelte';
    import Link from '$lib/assets/icons/Link.svelte';
    import Lock from '$lib/assets/icons/Lock.svelte';
    import Package from '$lib/assets/icons/Package.svelte';
</script>

<section>
    <h2>Nodes: The Foundation of the Network</h2>
    <div class="container">
        <div class="left">
            <p>
                Nodes are <strong>computers or devices</strong> within a Celaut network that communicate with
                peers and manage service execution.
            </p>
            <p class="intro-p">
                They form the <strong>backbone of the decentralized architecture</strong>, ensuring no
                single point of failure exists in the system.
            </p>

            <div class="implementation-block">
                <h3>Nodo</h3>
                <p>
                    The <strong>reference implementation</strong> of a Celaut node, built with Python3 and Rust,
                    providing a working example of how nodes can be deployed in real-world scenarios.
                </p>
                <a href="https://github.com/celaut-project/nodo" target="_blank" rel="noopener noreferrer">
                    <button>Nodo</button>
                </a>
            </div>

            <div class="implementation-block">
                <h3>Chatui</h3>
                <p>
                    Another implementation of a Celaut node for <strong>Android devices</strong>, it allows
                    interaction with services via <strong>basic chat interfaces</strong>, without requiring
                    trust to other nodes.
                </p>
                 <a href="https://github.com/celaut-project/chatui" target="_blank" rel="noopener noreferrer">
                    <button>Chatui</button>
                </a>
            </div>
        </div>

        <div class="right">
            <div class="feature">
                <div class="icon-wrapper"><Cpu /></div>
                <div class="text-wrapper">
                    <h4>Service Execution</h4>
                    <p>
                        The node negotiates <strong>execution costs</strong> with peers and decides whether
                        to run a service <strong>locally or delegate it</strong>, optimizing resource use.
                    </p>
                </div>
            </div>
            <div class="feature">
                <div class="icon-wrapper"><Link /></div>
                <div class="text-wrapper">
                    <h4>Communication</h4>
                    <p>
                        Nodes declare <strong>supported interfaces</strong> and <strong>accepted payment methods</strong>
                        upon contact, allowing protocol evolution without prior agreement.
                    </p>
                </div>
            </div>
            <div class="feature">
                <div class="icon-wrapper"><Lock /></div>
                <div class="text-wrapper">
                    <h4>Security</h4>
                    <p>
                        The node manages <strong>addresses and authentication tokens</strong> for secure
                        service interactions.
                    </p>
                </div>
            </div>
            <div class="feature">
                <div class="icon-wrapper"><Package /></div>
                <div class="text-wrapper">
                    <h4>Dependencies</h4>
                    <p>
                        The node ensures services access <strong>required dependencies</strong> across the
                        distributed network.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    /* Add this rule to remove the default underline from links wrapping buttons */
    a {
        text-decoration: none;
    }

    section {
        background-color: #1d4241;
        padding: 80px 40px;
    }

    h2 {
        text-align: center;
        font-size: 2.5rem;
        margin: 0 auto 60px auto;
        color: #ef9c82;
    }

    .container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 80px;
        align-items: start;
        max-width: 1200px;
        margin: 0 auto;
    }

    .left p {
        line-height: 1.7;
        margin: 0;
        color: rgba(249, 238, 231, 0.85);
    }
    
    .left p.intro-p {
        margin-bottom: 3rem; 
    }

    strong {
        color: #ef9c82;
        font-weight: 600;
    }
    
    /* --- EL TOQUE FINAL --- */

    .implementation-block {
        /* Añadimos un borde izquierdo que agrupa visualmente el contenido */
        border-left: 3px solid rgba(239, 156, 130, 0.4); /* El color de acento, pero con opacidad para que sea sutil */
        padding-left: 24px; /* Espacio para que el texto no se pegue al borde */
    }

    .implementation-block:not(:last-child) {
        margin-bottom: 2.5rem; 
    }
    
    .implementation-block h3 {
        color: #f9eee7;
        margin: 0 0 10px 0;
        font-size: 1.4rem;
    }
    
    .implementation-block p {
       margin-bottom: 1rem;
    }
        
    button {
        background-color: transparent;
        color: #f9eee7;
        border: 1px solid #f9eee7;
        padding: 10px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s ease-in-out;
    }

    button:hover {
        background-color: #ef9c82;
        color: #1d4241;
        border-color: #ef9c82;
    }

    /* --- ESTILOS DE LA DERECHA --- */

    .right {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    .feature {
        display: flex;
        align-items: flex-start;
        gap: 20px;
        padding-bottom: 30px;
        border-bottom: 1px solid rgba(249, 238, 231, 0.1);
    }
    
    .feature:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }

    .icon-wrapper {
        color: #ef9c82;
        width: 32px;
        height: 32px;
        flex-shrink: 0;
        margin-top: 3px;
    }

    h4 {
        margin: 0 0 8px 0;
        font-size: 1.2rem;
        color: #f9eee7;
    }

    .feature p {
        font-size: 0.95rem;
        line-height: 1.6;
        margin: 0;
        color: rgba(249, 238, 231, 0.85);
    }

    @media (max-width: 900px) {
        .container {
            grid-template-columns: 1fr;
            gap: 60px;
        }
    }
</style>