import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { Role } from '../roles/roles.entity';
import { User } from '../user/user.entity';
import { UserCompanyRole } from './user-company-role.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(UserCompanyRole)
    private userCompanyRoleRepository: Repository<UserCompanyRole>
  ) {}

  async create(name: string, currentUserId: string): Promise<Company> {
    // Создание новой компании
    const newCompany = this.companyRepository.create({ name });
    const savedCompany = await this.companyRepository.save(newCompany);

    // Получение текущего пользователя
    const currentUser = await this.userRepository.findOneBy({
      userId: currentUserId,
    });

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    // Получение роли
    const role = await this.roleRepository.findOne({
      where: { name: 'Owner' },
    });

    if (!role) {
      throw new Error('Роль не найдена');
    }

    // Создание связи между пользователем и компанией с заданной ролью
    const userOrganizationRole = this.userCompanyRoleRepository.create({
      user: currentUser,
      company: savedCompany,
      role: role,
    });

    await this.userCompanyRoleRepository.save(userOrganizationRole);

    return savedCompany;
  }
}
