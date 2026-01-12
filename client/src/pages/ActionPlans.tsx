import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplet, Apple, Dumbbell, AlertCircle, CheckCircle2, Clock } from "lucide-react";

/**
 * Design Philosophy: Clinical Minimalism with Cream/Black Palette
 * Comprehensive action plans with clear, actionable recommendations
 */

export default function ActionPlans() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Your Digestive Action Plan</h2>
        <p className="text-muted-foreground">
          Clear recommendations based on your patterns to optimize your digestive health.
        </p>
      </div>

      <Tabs defaultValue="hydration" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-secondary">
          <TabsTrigger value="hydration" className="flex items-center gap-2">
            <Droplet className="w-4 h-4" />
            <span className="hidden sm:inline">Hydration</span>
          </TabsTrigger>
          <TabsTrigger value="nutrition" className="flex items-center gap-2">
            <Apple className="w-4 h-4" />
            <span className="hidden sm:inline">Nutrition</span>
          </TabsTrigger>
          <TabsTrigger value="exercise" className="flex items-center gap-2">
            <Dumbbell className="w-4 h-4" />
            <span className="hidden sm:inline">Exercise</span>
          </TabsTrigger>
        </TabsList>

        {/* Hydration Tab */}
        <TabsContent value="hydration" className="space-y-6">
          <Card className="p-6 border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Droplet className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">Hydration Goal</h3>
                <p className="text-lg text-primary font-bold mb-2">2.5 - 3 liters per day</p>
                <p className="text-muted-foreground">
                  Based on your consistency patterns, adequate hydration is essential for optimal digestive function.
                </p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <h4 className="font-semibold text-foreground">Daily Hydration Schedule</h4>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="font-semibold text-foreground min-w-fit">Morning (6-9am):</span>
                  <span>500ml water + electrolytes</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-foreground min-w-fit">Mid-morning (10am):</span>
                  <span>250ml water</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-foreground min-w-fit">Lunch (12-1pm):</span>
                  <span>500ml water (30 min before meal)</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-foreground min-w-fit">Afternoon (3-4pm):</span>
                  <span>500ml water</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-foreground min-w-fit">Evening (6-7pm):</span>
                  <span>500ml water (before dinner)</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-foreground min-w-fit">Night (8pm+):</span>
                  <span>Limit to 250ml to avoid disruption</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <h4 className="font-semibold text-foreground">Hydration Tips</h4>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Drink water at room temperature for better absorption</li>
                <li>✓ Spread intake throughout the day (not all at once)</li>
                <li>✓ Drink 30 minutes before meals, not during</li>
                <li>✓ Monitor urine color (pale yellow = well hydrated)</li>
                <li>✓ Increase intake on exercise days</li>
                <li>✓ Herbal teas count toward daily intake</li>
                <li>✗ Avoid excessive caffeine (dehydrating)</li>
                <li>✗ Avoid drinking large amounts with meals</li>
              </ul>
            </Card>
          </div>
        </TabsContent>

        {/* Nutrition Tab */}
        <TabsContent value="nutrition" className="space-y-6">
          <Card className="p-6 border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Apple className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">Nutrition Strategy</h3>
                <p className="text-muted-foreground">
                  Optimize fiber intake, meal timing, and food combinations for consistent digestive patterns.
                </p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <h4 className="font-semibold text-foreground mb-4">Recommended Foods</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-primary mb-2">High Fiber (25-30g daily)</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Oats, whole wheat bread, brown rice</li>
                    <li>• Berries, apples, pears</li>
                    <li>• Leafy greens, broccoli, carrots</li>
                    <li>• Legumes, lentils, chickpeas</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary mb-2">Probiotics</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Yogurt, kefir, sauerkraut</li>
                    <li>• Kimchi, miso, tempeh</li>
                    <li>• Kombucha (unsweetened)</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold text-foreground mb-4">Foods to Limit</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-primary mb-2">Potential Triggers</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• High-fat processed foods</li>
                    <li>• Excessive caffeine (&gt;200mg/day)</li>
                    <li>• Alcohol (especially on empty stomach)</li>
                    <li>• Artificial sweeteners</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary mb-2">Introduce Gradually</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• New high-fiber foods (over 1-2 weeks)</li>
                    <li>• Fermented foods (start with small amounts)</li>
                    <li>• Test one new food at a time</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h4 className="font-semibold text-foreground mb-4">Sample Daily Meal Plan</h4>
            <div className="space-y-4 text-sm">
              <div className="flex gap-4">
                <span className="font-semibold text-primary min-w-fit">Breakfast (7am):</span>
                <span className="text-muted-foreground">Oatmeal with berries, ground flax, and yogurt</span>
              </div>
              <div className="flex gap-4">
                <span className="font-semibold text-primary min-w-fit">Snack (10am):</span>
                <span className="text-muted-foreground">Apple with almond butter</span>
              </div>
              <div className="flex gap-4">
                <span className="font-semibold text-primary min-w-fit">Lunch (12:30pm):</span>
                <span className="text-muted-foreground">Grilled chicken, brown rice, steamed broccoli, side salad</span>
              </div>
              <div className="flex gap-4">
                <span className="font-semibold text-primary min-w-fit">Snack (3pm):</span>
                <span className="text-muted-foreground">Carrot sticks with hummus</span>
              </div>
              <div className="flex gap-4">
                <span className="font-semibold text-primary min-w-fit">Dinner (6:30pm):</span>
                <span className="text-muted-foreground">Baked salmon, sweet potato, roasted vegetables</span>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Exercise Tab */}
        <TabsContent value="exercise" className="space-y-6">
          <Card className="p-6 border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Dumbbell className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">Exercise Routine</h3>
                <p className="text-muted-foreground">
                  Regular movement significantly improves digestive consistency and regularity.
                </p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Weekly Exercise Plan
              </h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-primary">Monday & Wednesday & Friday</p>
                  <p className="text-muted-foreground">30-45 min moderate cardio (walking, cycling, swimming)</p>
                </div>
                <div>
                  <p className="font-semibold text-primary">Tuesday & Thursday</p>
                  <p className="text-muted-foreground">20-30 min strength training (light weights or bodyweight)</p>
                </div>
                <div>
                  <p className="font-semibold text-primary">Saturday</p>
                  <p className="text-muted-foreground">30-60 min recreational activity (hiking, yoga, sports)</p>
                </div>
                <div>
                  <p className="font-semibold text-primary">Sunday</p>
                  <p className="text-muted-foreground">Rest or gentle stretching (20 min)</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold text-foreground mb-4">Daily Movement Habits</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Walk 30 minutes after meals (aids digestion)</li>
                <li>✓ Take stairs instead of elevators</li>
                <li>✓ Stand and stretch every hour</li>
                <li>✓ Do 5-10 min core exercises daily</li>
                <li>✓ Practice abdominal massage (clockwise)</li>
                <li>✓ Maintain good posture while eating</li>
                <li>✓ Avoid intense exercise 2 hours after meals</li>
                <li>✓ Stay consistent with timing</li>
              </ul>
            </Card>
          </div>

          <Card className="p-6">
            <h4 className="font-semibold text-foreground mb-4">Recommended Exercises</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold text-primary mb-2">Cardio</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Brisk walking</li>
                  <li>• Cycling</li>
                  <li>• Swimming</li>
                  <li>• Jogging</li>
                  <li>• Dancing</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-primary mb-2">Strength</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Planks</li>
                  <li>• Push-ups</li>
                  <li>• Squats</li>
                  <li>• Lunges</li>
                  <li>• Light weights</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-primary mb-2">Flexibility</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Yoga</li>
                  <li>• Pilates</li>
                  <li>• Stretching</li>
                  <li>• Tai Chi</li>
                  <li>• Foam rolling</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Implementation Guide */}
      <Card className="p-6 bg-secondary/30 border-2 border-primary/20">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          How to Implement This Plan
        </h3>
        <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
          <li>
            <span className="font-semibold text-foreground">Start with one category</span> — Don't change everything at once. Begin with hydration, then add nutrition, then exercise.
          </li>
          <li>
            <span className="font-semibold text-foreground">Track changes</span> — Log your habits and note how they affect your digestive patterns in the Event Log.
          </li>
          <li>
            <span className="font-semibold text-foreground">Give it time</span> — Allow 2-3 weeks to see meaningful changes in your consistency and regularity scores.
          </li>
          <li>
            <span className="font-semibold text-foreground">Adjust gradually</span> — Increase fiber intake slowly to avoid bloating. Introduce new foods one at a time.
          </li>
          <li>
            <span className="font-semibold text-foreground">Monitor your patterns</span> — Check your dashboard weekly to see improvements in your scores.
          </li>
          <li>
            <span className="font-semibold text-foreground">Consult your doctor</span> — If you have persistent issues, share your Ventre data with your healthcare provider.
          </li>
        </ol>
      </Card>
    </div>
  );
}
