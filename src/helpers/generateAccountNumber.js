export async function generateCode(length = 10) {
  var code = "";
  var chars = "1234567890";
  for (var i = length; i > 0; --i)
    code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}
