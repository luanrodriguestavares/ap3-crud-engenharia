require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { sequelize } = require('./models');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 100,
	message: {
		message: 'Muitas requisições deste IP, tente novamente mais tarde',
		details: 'Limite de requisições excedido'
	}
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(limiter);

app.use('/api/users', require('./routes/users'));

app.use((req, res) => {
	res.status(404).json({
		message: 'Rota não encontrada',
		details: 'A rota solicitada não existe'
	});
});

app.use((err, req, res, next) => {
	console.error('Erro no servidor:', err);
	res.status(500).json({
		message: 'Erro interno do servidor',
		details: process.env.NODE_ENV === 'development' ? err.message : 'Ocorreu um erro inesperado'
	});
});

async function startServer() {
	try {
		await sequelize.authenticate();
		console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');

		if (process.env.NODE_ENV === 'development') {
			await sequelize.sync({ alter: true });
			console.log('✅ Banco de dados sincronizado com sucesso.');
		}

		app.listen(PORT, () => {
			console.log(`🚀 Servidor rodando na porta ${PORT}`);
			console.log(`📝 Ambiente: ${process.env.NODE_ENV || 'development'}`);
		});
	} catch (error) {
		console.error('❌ Erro ao iniciar o servidor:', error);
		process.exit(1);
	}
}

process.on('unhandledRejection', (err) => {
	console.error('❌ Erro não tratado:', err);
	process.exit(1);
});

process.on('uncaughtException', (err) => {
	console.error('❌ Exceção não capturada:', err);
	process.exit(1);
});

startServer(); 