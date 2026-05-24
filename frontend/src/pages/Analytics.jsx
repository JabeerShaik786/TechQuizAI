import { motion } from 'framer-motion'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { useStatsStore } from '../store/index'
import { GlassCard, SectionTitle } from '../components/UIComponents'

const Analytics = () => {
  const { xp, level, quizzesCompleted, topicPerformance } = useStatsStore()

  const weeklyData = [
    { day: 'Mon', xp: 120, quizzes: 2 },
    { day: 'Tue', xp: 150, quizzes: 3 },
    { day: 'Wed', xp: 180, quizzes: 2 },
    { day: 'Thu', xp: 200, quizzes: 4 },
    { day: 'Fri', xp: 160, quizzes: 2 },
    { day: 'Sat', xp: 220, quizzes: 3 },
    { day: 'Sun', xp: 190, quizzes: 2 },
  ]

  const topicData = Object.entries(topicPerformance).map(([topic, accuracy]) => ({
    topic,
    accuracy: Math.round(accuracy * 10) / 10,
  }))

  const skillsData = [
    { skill: 'Python', value: 85 },
    { skill: 'AI/ML', value: 72 },
    { skill: 'Web Dev', value: 88 },
    { skill: 'Security', value: 65 },
    { skill: 'Database', value: 78 },
  ]

  return (
    <div className="p-4 md:p-8">
      <SectionTitle>Your Analytics</SectionTitle>

      {/* Overview Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-4 gap-4 mb-8"
      >
        {[
          { label: 'Total XP', value: xp },
          { label: 'Current Level', value: level },
          { label: 'Quizzes Done', value: quizzesCompleted },
          { label: 'Avg Accuracy', value: '78%' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="text-center">
              <p className="text-cyberpunk-text-secondary text-sm mb-2">{stat.label}</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-purple bg-clip-text text-transparent">
                {stat.value}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Weekly Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <GlassCard>
          <h3 className="text-2xl font-bold mb-6">Weekly Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid stroke="rgba(0, 245, 255, 0.1)" />
              <XAxis stroke="rgba(148, 163, 184, 0.5)" />
              <YAxis stroke="rgba(148, 163, 184, 0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(0, 245, 255, 0.3)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="xp" stroke="#00F5FF" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-2 gap-8 mb-8"
      >
        {/* Topic Performance */}
        <GlassCard>
          <h3 className="text-2xl font-bold mb-6">Topic Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topicData || []}>
              <CartesianGrid stroke="rgba(0, 245, 255, 0.1)" />
              <XAxis stroke="rgba(148, 163, 184, 0.5)" />
              <YAxis stroke="rgba(148, 163, 184, 0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(0, 245, 255, 0.3)',
                }}
              />
              <Bar dataKey="accuracy" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Skills Radar */}
        <GlassCard>
          <h3 className="text-2xl font-bold mb-6">Skills Radar</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={skillsData}>
              <PolarGrid stroke="rgba(0, 245, 255, 0.2)" />
              <PolarAngleAxis dataKey="skill" stroke="rgba(148, 163, 184, 0.5)" />
              <PolarRadiusAxis stroke="rgba(148, 163, 184, 0.5)" />
              <Radar name="Proficiency" dataKey="value" stroke="#00F5FF" fill="#00F5FF" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </GlassCard>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold mb-6">Recent Achievements</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { emoji: '🏆', title: 'Quiz Master', desc: 'Completed 50 quizzes' },
            { emoji: '🔥', title: 'On Fire', desc: '7-day streak' },
            { emoji: '💯', title: 'Perfect Score', desc: '100% on a quiz' },
          ].map((achievement, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-xl p-6 text-center"
            >
              <p className="text-4xl mb-2">{achievement.emoji}</p>
              <p className="font-bold mb-1">{achievement.title}</p>
              <p className="text-sm text-cyberpunk-text-secondary">{achievement.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Analytics
