import { prisma } from '../../prisma.js';

export const authUser = async (req, res) => {
  const {name,password} = req.body;
  const users = await prisma.user.findMany()
  console.log(name, password, users)
  res.json({ message: 'Ты успешно авторизовался', users })
}