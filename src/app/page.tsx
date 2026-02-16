import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-10">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold tracking-tight text-primary">
          Memory Match
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          Test your memory!
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-8">
        <Link href="/setup?mode=single" passHref>
          <button className="scene">
            <div className="cube">
              <span className="side top">Start Game</span>
              <span className="side front">Single Player</span>
            </div>
          </button>
        </Link>
        <Link href="/setup?mode=multi" passHref>
          <button className="scene">
            <div className="cube">
              <span className="side top">Start Game</span>
              <span className="side front">Multiplayer</span>
            </div>
          </button>
        </Link>
      </div>
    </main>
  );
}
