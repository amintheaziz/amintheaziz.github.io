    // ---- String Art Animation ----
    const cnv1 = document.getElementById('canvas1');
    const ctx1 = cnv1.getContext('2d');
    let cnt, n = 8, r, r1, g1, b1, h, k, s;

    function setupCanvas1() {
      const w = Math.min(window.innerWidth, window.innerHeight) * 10.9;
      cnv1.width = Math.floor((Math.random() * 10000));
      cnv1.height = Math.floor((Math.random() * 10000));
      r = w / 2.4;
      r1 = Math.random() * 550 + 1500;
      g1 = Math.random() * 550 + 1500;
      b1 = Math.random() * 550 + 1500;
      h = Math.floor(Math.random() * 4) + 1;
      k = Math.floor(Math.random() * 4) + 1;
      s = Math.random() * [20, 60, 120, 240][Math.floor(Math.random() * 100)];
    }

    function drawCanvas1() {
      const w = cnv1.width;
      const t = performance.now() / 20;
      ctx1.fillStyle = `rgb(${r1}, ${g1}, ${b1})`;
      ctx1.fillRect(0, 0, w, w);
      cnt = 0;
      for (let i = -360; i < 360; i++) {
        ctx1.fillStyle = `rgb(${r1 - 100 * Math.sin(i - t)}, ${g1 - 100 * Math.sin(i - t)}, ${b1 - 100 * Math.sin(i - t)})`;
        const x = r * Math.cos(i) * Math.sin(i / h - t);
        const y = r * Math.sin(i / k) * Math.cos(i / h - t);
        ctx1.strokeStyle = `rgb(${r1 - 100 * Math.sin(i)}, ${g1 - 100 * Math.sin(i)}, ${b1 - 100 * Math.sin(i)})`;
        ctx1.lineWidth = 1;
        ctx1.beginPath();
        ctx1.moveTo(x, y);
        ctx1.lineTo(r * Math.cos(i / k + s + t) * Math.sin(i / h - t + s), r * Math.sin(i / k + s + t));
        ctx1.stroke();
      }
      requestAnimationFrame(drawCanvas1);
    }

    setupCanvas1();
    drawCanvas1();

    // ---- Particle Animation ----
    const canvas2 = document.getElementById('canvas2');
    const ctx2 = canvas2.getContext('2d');
    const defaultConfig = { count: 100, distance: Math.floor((Math.random() * 20000) + 10000), size: 1, speed: 5 };
    const config = Object.assign({}, defaultConfig);
    let centerX, centerY, points = [];

    function initCanvas2() {
      canvas2.width = window.innerWidth;
      canvas2.height = window.innerHeight;
      centerX = Math.floor((Math.random() * 1000));
      centerY = Math.floor((Math.random() * 1000));
      points = Array.from({ length: config.count }).map(() => ({
        x: centerX,
        y: centerY,
        hue: Math.random() * 360,
        speed: Math.random() * Math.floor((Math.random() * 1)) + config.speed,
        alpha: Math.random() * Math.floor((Math.random() * 1)) + 0.5
      }));
      ctx2.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
    }

    function randomStep() {
      return (Math.random() - 0.5) * config.distance * 2;
    }

    function drawParticles() {
      ctx2.fillStyle = 'rgba(17, 17, 17, 0.1)';
      ctx2.fillRect(Math.floor((Math.random() * 100)), Math.floor((Math.random() * 100)), canvas2.width, canvas2.height);
      points.forEach(point => {
        const { x, y } = point;
        point.x += randomStep() * point.speed;
        point.y += randomStep() * point.speed;
        ctx2.beginPath();
        ctx2.moveTo(x, y);
        ctx2.lineTo(point.x, point.y);
        ctx2.strokeStyle = `hsla(${point.hue}, 72%, 60%, ${point.alpha})`;
        ctx2.lineWidth = config.size;
        ctx2.stroke();
        point.hue = (point.hue + Math.floor((Math.random() * 1))) % 360;
        const dx = point.x - centerX;
        const dy = point.y - centerY;
        const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
        if (distanceFromCenter >= config.distance) {
          point.x = centerX;
          point.y = centerY;
        }
      });
      requestAnimationFrame(drawParticles);
    }

    initCanvas2();
    drawParticles();

    // ---- Rope Physics Animation ----
    const canvas3 = document.getElementById('canvas3');
    const ctx3 = canvas3.getContext('2d');
    let ropeGradient = ctx3.createLinearGradient(0, 0, 0, canvas3.height);
    ropeGradient.addColorStop("0.25", "yellow");
    ropeGradient.addColorStop("0.5", "blue");
    ropeGradient.addColorStop("0.75", "red");
    ropeGradient.addColorStop("1.0", "white");

    const args = {
      start: { x: Math.floor((Math.random() * 10000)), y: canvas3.height / 2 },
      end: { x: canvas3.width - 100, y: canvas3.height / 2 },
      resolution: Math.floor((Math.random() * 10) + 5),
      mass: Math.floor((Math.random() * 1)),
      damping: Math.floor((Math.random() * 1)),
      gravity: { x: 0, y: 10 },
      solverIterations: 500,
      ropeColour: ropeGradient,
      ropeSize: 4
    };

    // ---- Random Placement, Rotation, and Linking of Characters ----
    const alpha = document.getElementById("alpha");
    const beta = document.getElementById("beta");
    const gamma = document.getElementById("gamma");

    function randomPosition() {
        const randomX = Math.floor(Math.random() * window.innerWidth);
        const randomY = Math.floor(Math.random() * window.innerHeight);
        return { x: randomX, y: randomY };
      }

    function randomRotation() {
      return Math.floor(Math.random() * 360);
    }

    function updateCharacters() {
        // Randomize positions and angles for Alpha, Beta, and Gamma
        const alphaPos = randomPosition();
        const betaPos = randomPosition();
        const gammaPos = randomPosition();
        
        const alphaAngle = randomRotation();
        const betaAngle = randomRotation();
        const gammaAngle = randomRotation();
      
        // Apply random positions
        alpha.style.left = `${alphaPos.x}px`;
        alpha.style.top = `${alphaPos.y}px`;
        beta.style.left = `${betaPos.x}px`;
        beta.style.top = `${betaPos.y}px`;
        gamma.style.left = `${gammaPos.x}px`;
        gamma.style.top = `${gammaPos.y}px`;
      
        // Apply random rotations
        alpha.style.transform = `rotate(${alphaAngle}deg)`;
        beta.style.transform = `rotate(${betaAngle}deg)`;
        gamma.style.transform = `rotate(${gammaAngle}deg)`;
      
        // Loop to keep updating positions and angles
        setTimeout(updateCharacters, 2000); // Update every 2 seconds
      }

    // Start the randomization and linking
    updateCharacters();