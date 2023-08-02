import { NextFunction, Request, Response } from 'express';
import multer, { StorageEngine } from 'multer';
import path from 'path';

// Configuração do armazenamento das imagens
const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, 'imagensUser/');
  },
  filename: (req: Request, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Configuração do upload com o Multer
const upload = multer({ storage });

// Middleware de upload
function uploadMiddleware(req: Request, res: Response, next: NextFunction) {
  // O nome 'imagem' deve corresponder ao nome do campo no formulário
  upload.single('image')(req, res, (err: any) => {
    if (err) {
      // Em caso de erro no upload, você pode lidar com o erro aqui
      console.error('Erro no upload:', err);
      return res.status(500).json({ error: 'Ocorreu um erro no upload da imagem' });
    }

    // Chamando next() para passar o controle para o próximo middleware ou rota
    next();
  });
}

export default uploadMiddleware;
