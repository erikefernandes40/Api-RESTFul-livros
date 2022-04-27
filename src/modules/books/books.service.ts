import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
//import { Book } from 'src/models';
import { CreateBookInput } from './dto/books';
import { BookRepository } from './repositories';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async createBook(input: CreateBookInput): Promise<any> {
    // Busca no banco de dados algum livro com o mesmo nome
    const foundBookByName = await this.bookRepository.findByUnique({
      name: input.name,
    });

    // Case exista, retorna erro 409
    if (foundBookByName)
      throw new ConflictException('Já existe um livro com este nome');

    try {
      // Retorna o livro criado
      return this.bookRepository.create(input);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async getBooks(): Promise<any> {
    try {
      // Retorna todos os livros
      return this.bookRepository.findAll();
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async updateBookAmount(newAmount: number, id: string): Promise<any> {
    // Busca no banco de dados o livro pelo id
    const foundBookById = await this.bookRepository.findByUnique({
      id,
    });

    // Case não exista, retorna erro 404
    if (!foundBookById)
      throw new NotFoundException('Livro não encontrado pelo id');

    try {
      // Retorna o livro atualizado
      return this.bookRepository.update({ amount: newAmount }, id);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}


