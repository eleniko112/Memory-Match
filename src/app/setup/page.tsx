'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function SetupPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'single';

  // Single Player State
  const [cardCountSingle, setCardCountSingle] = useState('16');
  const [timeLimit, setTimeLimit] = useState('60');

  // Multi Player State
  const [playerCount, setPlayerCount] = useState('2');
  const [cardCountMulti, setCardCountMulti] = useState('24');
  
  const singlePlayerHref = `/game?mode=single&cards=${cardCountSingle}&time=${timeLimit}`;
  const multiPlayerHref = `/game?mode=multi&players=${playerCount}&cards=${cardCountMulti}`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-primary mb-8">Game Setup</h1>
      <Tabs defaultValue={mode} className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="single">Single Player</TabsTrigger>
          <TabsTrigger value="multi">Multiplayer</TabsTrigger>
        </TabsList>
        <TabsContent value="single">
          <Card>
            <CardHeader>
              <CardTitle>Single Player Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Number of Cards</Label>
                <RadioGroup value={cardCountSingle} onValueChange={setCardCountSingle} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="8" id="s-cards-8" />
                    <Label htmlFor="s-cards-8">8</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="16" id="s-cards-16" />
                    <Label htmlFor="s-cards-16">16</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="24" id="s-cards-24" />
                    <Label htmlFor="s-cards-24">24</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Time Limit</Label>
                <RadioGroup value={timeLimit} onValueChange={setTimeLimit} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="30" id="time-30" />
                    <Label htmlFor="time-30">30s</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="60" id="time-60" />
                    <Label htmlFor="time-60">60s</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="90" id="time-90" />
                    <Label htmlFor="time-90">90s</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="time-unlimited" />
                    <Label htmlFor="time-unlimited">Unlimited</Label>
                  </div>
                </RadioGroup>
              </div>
              <Link href={singlePlayerHref} passHref>
                <Button className="w-full">Start Game</Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="multi">
          <Card>
            <CardHeader>
              <CardTitle>Multiplayer Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="space-y-2">
                <Label>Number of Players</Label>
                <RadioGroup value={playerCount} onValueChange={setPlayerCount} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="p-2" />
                    <Label htmlFor="p-2">2</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="p-3" />
                    <Label htmlFor="p-3">3</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4" id="p-4" />
                    <Label htmlFor="p-4">4</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Number of Cards</Label>
                <RadioGroup value={cardCountMulti} onValueChange={setCardCountMulti} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="16" id="m-cards-16" />
                    <Label htmlFor="m-cards-16">16</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="24" id="m-cards-24" />
                    <Label htmlFor="m-cards-24">24</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="36" id="m-cards-36" />
                    <Label htmlFor="m-cards-36">36</Label>
                  </div>
                </RadioGroup>
              </div>
              <Link href={multiPlayerHref} passHref>
                <Button className="w-full">Start Game</Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default function SetupPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SetupPage />
    </Suspense>
  );
}
