(function ($) {
  "use strict";

  /*==================================================================
    [ Validate ]*/
  var input = $(".validate-input .input100");

  $("#newsletter-form").on("submit", function (e) {
    var check = true;

    e.preventDefault();

    var emailId = $("#newsletter-form input").val();

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }
    if (check) {
      // jquery ajax submit form
      $.ajax({
        url: "https://imbuzi-api.vercel.app/api/newsletter",
        type: "POST",
        data: { email: emailId },
        dataType: "json",
        accept: "application/json",
        beforeSend: function () {
          $("#newsletter-form .loading").show();
        },
        success: function (response) {
          $("#newsletter-form .loading").hide();
          window.location.href = "https://forms.gle/3W7otSEMTdirtnKK6";
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR, textStatus, errorThrown);
          $("#newsletter-form .loading").hide();
        },
      });
    }

    return check;
  });

  $(".validate-form .input100").each(function () {
    $(this).focus(function () {
      //    hideValidate(this);
    });
  });

  function validate(input) {
    if ($(input).attr("type") == "email" || $(input).attr("name") == "email") {
      if (
        $(input)
          .val()
          .trim()
          .match(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
          ) == null
      ) {
        return false;
      }
    } else {
      if ($(input).val().trim() == "") {
        return false;
      }
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass("alert-validate");
  }

  /*==================================================================
    [ Simple slide100 ]*/

  $(".simpleslide100").each(function () {
    var delay = 7000;
    var speed = 1000;
    var itemSlide = $(this).find(".simpleslide100-item");
    var nowSlide = 0;

    $(itemSlide).hide();
    $(itemSlide[nowSlide]).show();
    nowSlide++;
    if (nowSlide >= itemSlide.length) {
      nowSlide = 0;
    }

    setInterval(function () {
      $(itemSlide).fadeOut(speed);
      $(itemSlide[nowSlide]).fadeIn(speed);
      nowSlide++;
      if (nowSlide >= itemSlide.length) {
        nowSlide = 0;
      }
    }, delay);
  });
})(jQuery);
