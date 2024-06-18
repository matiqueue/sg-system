$(document).ready(function() {
    $('#contact-form').submit(function(e) {
      e.preventDefault();

      var name = $('#name').val();
      var email = $('#email').val();
      var phone = $('#phone').val();
      var subject = $('#subject').val();
      var message = $('#message').val();
      var ip = 'unknown';

      $.getJSON("https://api.ipify.org?format=json", function(data) {
        ip = data.ip;

        var currentDateTime = new Date().toLocaleString();

        var payload = {
          embeds: [{
            color: 16777215,
            description: "# > Wiadomość z dnia " + currentDateTime,
            fields: [
              { name: "**Imię i nazwisko:**", value: name },
              { name: "**Adres email:**", value: email },
              { name: "**Numer telefonu:**", value: phone },
              { name: "**IP:**", value: ip },
              { name: "", value: "\u200B" },
              { name: "**> Temat wiadomości:**", value: "```" + subject + "```" },
              { name: "**> Treść wiadomości:**", value: "```" + message + "```" }
            ],
            thumbnail: {
              url: "https://sgsystemsglobal.com/wp-content/uploads/2014/01/FullSizeRender-1.jpg"
            }
          }]
        };

        $.ajax({
          url: "https://discordapp.com/api/webhooks/1125344437195772005/CT3oH6lpPy7PpSquJtaQw584DaSUg_35M4LD2Ijm0HUD7bPzsZbfm1-hvQbsLdbAOes4",
          type: "POST",
          data: JSON.stringify(payload),
          contentType: "application/json",
          success: function() {
            alert("Wiadomość została wysłana!");
            $('#contact-form')[0].reset();
          },
          error: function() {
            alert("Wystąpił błąd podczas wysyłania wiadomości.");
          }
        });
      });
    });
  });