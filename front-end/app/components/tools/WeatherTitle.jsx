

export default function WeatherTitle() {
  return (
    <div className="flex flex-col items-center justify-center mt-24 mb-16">
      <h1
        className="text-6xl font-bold bg-gradient-to-r mb-8 from-blue-500 to-purple-500 bg-clip-text text-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Weather Simulator
      </h1>
      <p
        className="text-xl text-center max-w-[50rem] :text-gray-300 mb-8"
      >
        Simulate your building design using real-time and forecasted weather from your chosen location.
        Analyze how temperature, humidity, and extreme events affect performance.
        Predict long-term impacts on energy use, comfort, and material lifespan.
      </p>
    </div>
  );
}
