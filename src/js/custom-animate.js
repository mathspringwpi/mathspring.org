$(function () {
    var currentText = $('.count').text();
    $('.section-panel').hover(
        function () {
            $('.count').each(function () {
                var $this = $(this);
                jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
                    duration: 1200,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
        },
        function () {
            $('.count').text(Math.floor(currentText / 10000));
        }
    );
});