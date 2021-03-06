if Rails.env == 'production'

  #Only load this in production. In dev we will use a simple in memory queue
  require 'backburner'

  BACKBURNER_CONFIG = YAML.load_file(File.join(Rails.root,'config','backburner.yml'))[Rails.env]

  Backburner.configure do |config|
    config.beanstalk_url       = [BACKBURNER_CONFIG['beanstalk_url']]
    config.tube_namespace      = Rails.env
    config.namespace_separator = "_"
    # config.on_error            = lambda { |e| puts e }
    # config.max_job_retries     = 3 # default 0 retries
    # config.retry_delay         = 2 # default 5 seconds
    # config.retry_delay_proc    = lambda { |min_retry_delay, num_retries| min_retry_delay + (num_retries ** 3) }
    config.default_priority    = 100
    config.respond_timeout     = 60 * 60 * 3 # Seconds. 2 hours to finish a queued job. Can't be 0!
    config.default_worker      = Backburner::Workers::Forking
    config.logger              = Logger.new(STDOUT)
    config.primary_queue       = "export"
    #config.priority_labels     = { :custom => 50, :useless => 1000 }
    config.reserve_timeout     = nil
  end

end
