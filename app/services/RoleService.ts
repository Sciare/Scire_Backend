import { RoleById } from "@/db/interfaces/Role/Role.interfaces";
import { Role } from "@/db/models/Role/model/Role";
import { UserRole } from "@/db/models/UserRole/model/UserRole";
import { RoleNotFound } from "@/errors/role/RoleNotFound";
import { Query } from "@/libraries/ModelController";

export const getRoleById = async ({ id, queryParams }: RoleById) => {
  const { attributes, include, where } = queryParams;
  const role = await Role.findOne({
    where: { ...where, isPrivate: false, id },
    include,
    attributes,
  });

  if (!role) throw new RoleNotFound();

  return role;
};

export const getAllRoles = async (queryParams: Query) => {
  const { where, limit, offset, order, include, attributes } = queryParams;
  const { count, rows: data } = await Role.findAndCountAll({
    where: { ...where, isPrivate: false },
    limit,
    offset,
    order,
    include,
    distinct: true,
    col: "id",
    attributes,
  });

  return { count, data };
};

export const addDefaultRoleToUser = async (userId: number) => {
  const role: Role = await Role.findOne({
    where: { isDefault: true },
  });

  if (!role) {
    return;
  }

  await UserRole.findOrCreate({
    where: { roleId: role.id, userId },
  });
};
