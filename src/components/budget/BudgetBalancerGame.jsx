import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Trophy, Heart, Info } from 'lucide-react';

const PADDLE_WIDTH = 90;
const PADDLE_HEIGHT = 12;
const ITEM_SIZE = 48;

const GOOD_ITEMS = [
  { emoji: "💰", label: "Savings", points: 20, color: "#34d399" },
  { emoji: "📈", label: "RRSP", points: 30, color: "#60a5fa" },
  { emoji: "💹", label: "Investment", points: 25, color: "#60a5fa" },
  { emoji: "🏋️", label: "Gym", points: 15, color: "#34d399" },
  { emoji: "🏠", label: "Rent paid", points: 20, color: "#34d399" },
];

const BAD_ITEMS = [
  { emoji: "☕", label: "Tim Hortons", points: -10, color: "#f59e0b" },
  { emoji: "🎰", label: "Scratch card", points: -20, color: "#f87171" },
  { emoji: "💳", label: "Hidden fee", points: -25, color: "#f87171" },
  { emoji: "🛍️", label: "Impulse buy", points: -15, color: "#f87171" },
  { emoji: "🟥", label: "Roblox", points: -10, color: "#f59e0b" },
];

function createItem(canvasWidth) {
  const isGood = Math.random() > 0.45;
  const pool = isGood ? GOOD_ITEMS : BAD_ITEMS;
  const template = pool[Math.floor(Math.random() * pool.length)];
  return {
    id: Date.now() + Math.random(),
    x: Math.random() * (canvasWidth - ITEM_SIZE),
    y: -ITEM_SIZE,
    speed: 1.2 + Math.random() * 1.8,
    ...template,
    isGood,
  };
}

const BASE_SAVINGS_RATE = 35.4;

export default function BudgetBalancerGame() {
  const [gameState, setGameState] = useState('idle'); // idle | playing | over
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [items, setItems] = useState([]);
  const [paddleX, setPaddleX] = useState(150);
  const [feedback, setFeedback] = useState(null);
  const [highScore, setHighScore] = useState(0);
  const [savingsRate, setSavingsRate] = useState(BASE_SAVINGS_RATE);

  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const lastSpawn = useRef(0);
  const itemsRef = useRef([]);
  const paddleRef = useRef(150);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const gameStateRef = useRef('idle');

  const getCanvasWidth = useCallback(() => canvasRef.current?.offsetWidth ?? 400, []);

  const startGame = () => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0); scoreRef.current = 0;
    setLives(3); livesRef.current = 3;
    setItems([]); itemsRef.current = [];
    setSavingsRate(BASE_SAVINGS_RATE);
    setFeedback(null);
    lastSpawn.current = 0;
  };

  const handlePointerMove = useCallback((e) => {
    if (gameStateRef.current !== 'playing') return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left - PADDLE_WIDTH / 2;
    const clamped = Math.max(0, Math.min(rect.width - PADDLE_WIDTH, x));
    paddleRef.current = clamped;
    setPaddleX(clamped);
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const CANVAS_HEIGHT = canvasRef.current?.offsetHeight ?? 520;
    const COLLISION_Y = CANVAS_HEIGHT - PADDLE_HEIGHT - 16;

    const loop = (ts) => {
      if (gameStateRef.current !== 'playing') return;
      const cw = getCanvasWidth();

      // Spawn
      if (ts - lastSpawn.current > 900) {
        lastSpawn.current = ts;
        itemsRef.current = [...itemsRef.current, createItem(cw)];
      }

      let newScore = scoreRef.current;
      let newLives = livesRef.current;
      let caught = null;
      const updated = [];

      for (const item of itemsRef.current) {
        const ny = item.y + item.speed;
        const hitBottom = ny + ITEM_SIZE >= COLLISION_Y;
        const hitPaddle = item.x + ITEM_SIZE > paddleRef.current && item.x < paddleRef.current + PADDLE_WIDTH;

        if (hitBottom && hitPaddle) {
          // Caught by paddle
          newScore += item.points;
          caught = item;
          if (!item.isGood) {
            newLives = Math.max(0, newLives - 1);
          }
          // Good items missed = no penalty (just disappear)
          continue;
        }

        if (ny > COLLISION_Y + ITEM_SIZE) {
          // Off screen — only bad items that fall through do nothing
          // Missing a good item = no life lost
          continue;
        }

        updated.push({ ...item, y: ny });
      }

      itemsRef.current = updated;
      scoreRef.current = newScore;
      livesRef.current = newLives;

      setItems([...updated]);
      setScore(newScore);
      setLives(newLives);
      if (caught) setFeedback({ ...caught, key: Date.now() });
      setSavingsRate(Math.max(0, Math.min(100, BASE_SAVINGS_RATE + newScore * 0.15)));

      if (newLives <= 0) {
        gameStateRef.current = 'over';
        setGameState('over');
        setHighScore((p) => Math.max(p, newScore));
        return;
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [gameState, getCanvasWidth]);

  useEffect(() => {
    if (feedback) {
      const t = setTimeout(() => setFeedback(null), 700);
      return () => clearTimeout(t);
    }
  }, [feedback]);

  const rateColor = savingsRate >= BASE_SAVINGS_RATE ? 'text-emerald-400' : savingsRate > 20 ? 'text-amber-400' : 'text-red-400';

  return (
    <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-sm font-data text-muted-foreground mb-2">Mini game</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">Budget Balancer</h2>
          <p className="text-muted-foreground max-w-lg">
            Catch the good stuff (savings, investments). Let the bad stuff fall — but if you catch it, you lose a life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6 items-start">

          {/* Game area */}
          <div
            ref={canvasRef}
            className="relative bg-card border border-border rounded-2xl overflow-hidden cursor-none select-none touch-none"
            style={{ height: 520 }}
            onMouseMove={handlePointerMove}
            onTouchMove={handlePointerMove}
          >
            {/* Subtle grid */}
            <div className="absolute inset-0 opacity-[0.025]" style={{
              backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />

            {/* Idle screen */}
            {gameState === 'idle' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10">
                <div className="text-center">
                  <p className="text-5xl mb-3">🎯</p>
                  <p className="text-foreground font-semibold mb-1">Move your mouse to control the paddle</p>
                  <p className="text-sm text-muted-foreground">Catch savings · Dodge expenses</p>
                </div>
                <button
                  onClick={startGame}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Play className="w-4 h-4" /> Play
                </button>
              </div>
            )}

            {/* Game over screen */}
            {gameState === 'over' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 bg-card/90 backdrop-blur-sm"
              >
                <p className="text-4xl">💸</p>
                <div className="text-center">
                  <p className="text-xl font-heading font-bold text-foreground mb-1">Budget busted</p>
                  <p className="font-data text-2xl text-primary font-bold">{score} pts</p>
                  <p className="text-sm text-muted-foreground mt-1">Savings rate: {savingsRate.toFixed(1)}%</p>
                </div>
                <button
                  onClick={startGame}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <RotateCcw className="w-4 h-4" /> Try again
                </button>
              </motion.div>
            )}

            {/* Falling items */}
            {items.map((item) => (
              <div
                key={item.id}
                className="absolute flex flex-col items-center justify-center pointer-events-none"
                style={{ left: item.x, top: item.y, width: ITEM_SIZE, height: ITEM_SIZE }}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${item.isGood ? 'bg-emerald-500/15 border border-emerald-500/30' : 'bg-red-500/10 border border-red-500/20'}`}>
                  {item.emoji}
                </div>
              </div>
            ))}

            {/* Score popup */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  key={feedback.key}
                  initial={{ opacity: 1, y: 0, x: '-50%' }}
                  animate={{ opacity: 0, y: -40, x: '-50%' }}
                  transition={{ duration: 0.7 }}
                  className="absolute left-1/2 bottom-20 font-data font-bold text-xl pointer-events-none"
                  style={{ color: feedback.color }}
                >
                  {feedback.points > 0 ? '+' : ''}{feedback.points}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Paddle */}
            {gameState === 'playing' && (
              <div
                className="absolute rounded-full bg-primary"
                style={{ left: paddleX, bottom: 16, width: PADDLE_WIDTH, height: PADDLE_HEIGHT }}
              />
            )}
          </div>

          {/* Side panel */}
          <div className="flex flex-col gap-4">

            {/* Live savings rate */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Live savings rate</p>
              <p className={`text-4xl font-data font-bold ${rateColor}`}>{savingsRate.toFixed(1)}%</p>
              <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-emerald-500"
                  animate={{ width: `${Math.min(100, savingsRate)}%` }}
                  transition={{ type: 'spring', damping: 20 }}
                />
              </div>
            </div>

            {/* Score & lives */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-primary" />
                  <span className="font-data font-bold text-foreground text-lg">{score}</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Heart key={i} className={`w-4 h-4 ${i < lives ? 'text-red-400 fill-red-400' : 'text-border'}`} />
                  ))}
                </div>
              </div>
              {highScore > 0 && (
                <p className="text-xs text-muted-foreground font-data">Best: {highScore} pts</p>
              )}
            </div>

            {/* Legend */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Items</p>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground mb-1 font-medium">Catch these ↓</p>
                {GOOD_ITEMS.slice(0, 3).map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{item.emoji}</span>
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                    </div>
                    <span className="text-xs font-data text-emerald-400">+{item.points}</span>
                  </div>
                ))}
                <div className="h-px bg-border my-2" />
                <p className="text-xs text-muted-foreground mb-1 font-medium">Avoid these ↓</p>
                {BAD_ITEMS.slice(0, 3).map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{item.emoji}</span>
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                    </div>
                    <span className="text-xs font-data text-red-400">{item.points}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tip */}
            <div className="flex items-start gap-2 px-3 py-2.5 bg-muted/50 rounded-xl">
              <Info className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">Missing a good item is fine — no penalty. Only catching bad items costs a life.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}