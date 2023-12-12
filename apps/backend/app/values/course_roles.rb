module CourseRoles
  ADMIN = :admin
  MANAGER = :manager
  VIEWER = :viewer

  def self.all
    [ADMIN, MANAGER, VIEWER]
  end

  def self.with_write_access
    [ADMIN, MANAGER]
  end

  def self.with_read_access
    [ADMIN, MANAGER, VIEWER]
  end

  def self.without_access
    []
  end

  def self.valid?(role)
    all.include?(role)
  end
end
