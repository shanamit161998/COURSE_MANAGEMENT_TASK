module.exports = {
    userCheck: 'SELECT * FROM testdb.employee WHERE email = ?',
    signUp: 'INSERT INTO testdb.employee (name, email , password, roleId ) VALUES (? , ? , ? , ? )',
    signIn: 'SELECT e.name , e.email, e.password , r.role, e.roleId  FROM testdb.employee as e INNER JOIN testdb.roles as r ON r.role_id = e.roleId WHERE e.email = ? ',
    getCourse: 'SELECT * FROM testdb.courses WHERE approval = ? ORDER BY CATEGORY',
    insertCourse: 'INSERT INTO testdb.courses (title, description, videoUrl, courseDuration, category) VALUES ( ? , ? ,? ,? , ? )',
    updateCourse: 'UPDATE testdb.courses SET title = ?, description = ?, videoUrl = ?, courseDuration =?, category =? WHERE serial_no = ?',
    deleteCourse:'DELETE FROM testdb.courses WHERE serial_no =  ?', 
    approve: 'UPDATE testdb.courses SET approval = ?  WHERE serial_no = ?'
}