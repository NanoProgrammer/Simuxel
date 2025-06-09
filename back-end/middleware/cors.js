import cors from 'cors';

export const MiddleCors = ({ AcceptedOrigin }) => {
  return cors({
    origin: (origin, callback) => {
      if (!origin || AcceptedOrigin.includes(origin)) {
        callback(null, true); 
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  });
};
